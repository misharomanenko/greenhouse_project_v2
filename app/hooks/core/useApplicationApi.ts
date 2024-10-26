import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import path from 'path';
import { useLocalStorage } from '../misc/useLocalStorage';

const GREENHOUSE_API_URL = 'https://harvest.greenhouse.io/v1/candidates';
const API_KEY = process.env.NEXT_PUBLIC_GREENHOUSE_API_KEY || '';
const ON_BEHALF_OF = process.env.NEXT_PUBLIC_GREENHOUSE_USER_ID || '';

// Add function to write to JSON file

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const { jobId, attachments } = req.body;

    if (!jobId) {
      return res.status(400).json({ 
        message: 'Bad Request', 
        error: 'Job ID is required' 
      });
    }

    if (!attachments?.length) {
      return res.status(400).json({ 
        message: 'Bad Request', 
        error: 'At least one attachment is required' 
      });
    }

    const data = {
      job_id: jobId,
      attachments: attachments.map((attachment: any) => ({
        filename: attachment.filename,
        type: attachment.type,
        content: attachment.content,
        content_type: attachment.content_type
      }))
    };

    try {
      const response = await axios.post(GREENHOUSE_API_URL, data, {
        headers: {
          'Authorization': `Basic ${Buffer.from(API_KEY + ':').toString('base64')}`,
          'Content-Type': 'application/json',
          'On-Behalf-Of': ON_BEHALF_OF
        }
      });
      
      res.status(200).json({ 
        message: 'Application submitted successfully', 
        data: response.data 
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Axios error:', error.response?.data || error.message);
        if (error.response?.data?.errors?.[0]?.message === 'This candidate already has an active application on that job') {
          res.status(409).json({ 
            message: 'Application already exists',
            error: 'You have already submitted an application for this job.'
          });
        } else {
          res.status(500).json({ 
            message: 'Error submitting application to Greenhouse', 
            error: error.response?.data || error.message || 'Unknown error'
          });
        }
      }
    }
  } catch (error) {
    console.error('Error processing application:', error);
    res.status(500).json({ 
      message: 'Error processing application', 
      error: error instanceof Error ? error.message : String(error) 
    });
  }
}

// Define the types for our application data
interface Attachment {
  filename: string;
  type: string;
  content: string;
  content_type: string;
}

interface ApplicationData {
  job_id: number | null;
  attachments: Attachment[];
}

// Modify the custom hook
export const useApplicationSubmission = () => {
  const [applications, setApplications] = useLocalStorage<ApplicationData>('applications', {
    job_id: null,
    attachments: []
  });

  const saveApplication = async (jobId: string, applicationData: any) => {
    // Make sure we have the resume data
    if (!applicationData.resume?.file || !applicationData.resume?.content) {
      throw new Error('Resume is required to save');
    }

    // Format the data properly for the API
    const localData: ApplicationData = {
      job_id: parseInt(jobId),
      attachments: [{
        filename: applicationData.resume.file.name,
        type: 'resume',
        content: applicationData.resume.content,
        content_type: applicationData.resume.file.type
      }]
    };

    try {
      // Save to localStorage
      setApplications(localData);
      
      // Save to API
      const response = await axios.post('/api/applications/save', localData);
      if (!response.data) {
        throw new Error('Failed to save application');
      }
      return true;
    } catch (error) {
      console.error('Error saving application data:', error);
      throw error;
    }
  };

  const loadSavedApplication = async (jobId: string) => {
    try {
      const response = await axios.get(`/api/applications/save?jobId=${jobId}`);
      if (response.data?.data) {
        setApplications(response.data.data);
        return response.data.data;
      }
      return null;
    } catch (error) {
      console.error('Error loading saved application:', error);
      return null;
    }
  };

  const submitApplication = async (jobId: string, applicationData: any) => {
    // Format the request body for Greenhouse API
    const requestBody = {
      job_id: parseInt(jobId),
      first_name: applicationData.first_name,
      last_name: applicationData.last_name,
      email: applicationData.email_value,
      phone: applicationData.phone_value,
      resume: applicationData.resume,
      cover_letter: applicationData.coverLetter,
      website_addresses: [
        {
          value: applicationData.website_value,
          type: applicationData.website_addresses
        }
      ],
      social_media_addresses: applicationData.social_media?.split(',').map((url: string) => ({
        value: url.trim()
      })) || [],
      phone_numbers: [
        {
          value: applicationData.phone_value,
          type: applicationData.phone_numbers
        }
      ],
      email_addresses: [
        {
          value: applicationData.email_value,
          type: applicationData.email_addresses
        }
      ],
      addresses: applicationData.address_value ? [
        {
          value: applicationData.address_value,
          type: applicationData.addresses
        }
      ] : [],
      educations: [],
      employments: [],
      attachments: [
        {
          filename: applicationData.resume?.file?.name,
          type: 'resume',
          content: applicationData.resume?.content,
          content_type: applicationData.resume?.file?.type
        }
      ].filter(attachment => attachment.content)
    };

    try {
      // Submit directly to Greenhouse API
      const response = await axios.post(GREENHOUSE_API_URL, requestBody, {
        headers: {
          'Authorization': `Basic ${Buffer.from(API_KEY + ':').toString('base64')}`,
          'Content-Type': 'application/json',
          'On-Behalf-Of': ON_BEHALF_OF
        }
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Greenhouse API error:', error.response?.data);
        throw new Error(error.response?.data?.error || error.message);
      }
      throw error;
    }
  };

  return { submitApplication, saveApplication, loadSavedApplication, applications };
};
