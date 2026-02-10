// components/EmailTemplate.tsx
import * as React from 'react';

interface EmailTemplateProps {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  name,
  email,
  phone,
  message,
}) => (
  <div style={{ fontFamily: 'sans-serif', padding: '20px', maxWidth: '600px' }}>
    <h1 style={{ color: '#2563eb' }}>New Project Enquiry</h1>
    <p><strong>From:</strong> {name}</p>
    <p><strong>Email:</strong> {email}</p>
    <p><strong>Phone:</strong> {phone}</p>
    <h3>Message:</h3>
    <p style={{ whiteSpace: 'pre-wrap' }}>{message}</p>
    <hr />
    <p style={{ fontSize: '14px', color: '#666' }}>
      Sent via NYUtech website – {new Date().toLocaleDateString()}
    </p>
  </div>
);
