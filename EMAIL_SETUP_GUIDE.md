# Email Configuration Setup Guide

## EmailJS Setup Instructions

Follow these steps to set up automatic email notifications for your contact form:

### Step 1: Create EmailJS Account
1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Sign up for a free account
3. Verify your email address

### Step 2: Create Email Service
1. In your EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the connection instructions
5. Note down your **SERVICE_ID**

### Step 3: Create Email Templates

#### Template 1: Notification to You (when someone contacts you)
1. Go to "Email Templates" in your dashboard
2. Click "Create New Template"
3. Use this template:

```
Subject: New Contact Form Submission from {{from_name}}

Hello,

You have received a new message from your portfolio contact form:

From: {{from_name}}
Email: {{from_email}}

Message:
{{message}}

---
This email was sent automatically from your portfolio website.
```

4. Save and note the **TEMPLATE_ID**

#### Template 2: Auto-Reply to User
1. Create another new template
2. Use this template:

```
Subject: Thank you for contacting me!

Hello {{to_name}},

Thank you for reaching out through my portfolio website. I have received your message and will get back to you as soon as possible.

If you have any urgent inquiries, feel free to contact me directly.

Best regards,
Your Name

---
This is an automated response. Please do not reply to this email.
```

3. Save and note the **AUTO_REPLY_TEMPLATE_ID**

### Step 4: Get Your Public Key
1. Go to "Account" → "General"
2. Find your **Public Key**

### Step 5: Update Your Code
Replace the following placeholders in your contact.html file:

```javascript
// Replace these values:
emailjs.init("YOUR_PUBLIC_KEY"); // Your actual public key
'YOUR_SERVICE_ID' // Your email service ID
'YOUR_TEMPLATE_ID' // Your notification template ID
'YOUR_AUTO_REPLY_TEMPLATE_ID' // Your auto-reply template ID
'Your Name' // Replace with your actual name
```

### Step 6: Test Your Form
1. Save all files
2. Open your portfolio in a browser
3. Fill out the contact form with a test email
4. Check if you receive both:
   - Notification email to your email
   - Auto-reply email to the test email address

## Security Notes
- Your EmailJS public key is safe to use in frontend code
- EmailJS has rate limiting to prevent spam
- Free plan includes 200 emails/month

## Troubleshooting
- Make sure all IDs are correctly replaced
- Check browser console for any error messages
- Verify your email service connection in EmailJS dashboard
- Test with a valid email address

## Features Included
✅ Form submission with loading state
✅ Email notification to you when someone contacts
✅ Auto-reply email to the person who contacted you
✅ Success/error message display
✅ Form reset after successful submission
✅ Responsive design
✅ Animation effects

## Email Content
The auto-reply email will say:
"Thank you for reaching out through my portfolio website. I have received your message and will get back to you as soon as possible."
