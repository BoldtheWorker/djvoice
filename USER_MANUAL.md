# DJ Voice - User Manual

## Table of Contents
1. [Project Overview](#project-overview)
2. [Getting Started](#getting-started)
3. [Admin Panel Access](#admin-panel-access)
4. [Content Management](#content-management)
5. [Managing Events](#managing-events)
6. [Managing Mixtapes](#managing-mixtapes)
7. [Portfolio Management](#portfolio-management)
8. [Blog Posts](#blog-posts)
9. [Media Library](#media-library)
10. [Bookings Management](#bookings-management)
11. [Subscribers Management](#subscribers-management)
12. [Technical Information](#technical-information)

---

## Project Overview

**DJ Voice** is a professional DJ website featuring:
- **Brand Motto**: "Voice of the world"
- **Location**: Akosombo, Ghana
- **Color Scheme**: Black, White, and Vibrant Red
- **Technology**: React + TypeScript with Supabase backend

### Main Features
- Mixtape streaming and downloads
- Event showcase and ticket links
- Portfolio gallery
- Blog/News section
- Booking system
- Admin content management
- Email subscriber management

---

## Getting Started

### For Visitors
1. Navigate to the homepage to explore featured content
2. Browse mixtapes, upcoming events, and portfolio
3. Submit booking inquiries through the contact form
4. Subscribe to the newsletter for updates

### For Administrators
Access the admin panel to manage all website content including events, mixtapes, portfolio items, blog posts, and more.

---

## Admin Panel Access

### Login Process
1. Navigate to `/admin/login` in your browser
2. Enter the admin secret code: `@dm1n-v01ce`
3. Click "Access Admin Panel"

**Security Note**: Keep the admin secret code confidential. Authentication is verified through a secure edge function.

### Admin Dashboard Overview
After login, you'll see the main dashboard with navigation to:
- **Dashboard** - Overview and statistics
- **Events** - Manage upcoming events
- **Mixtapes** - Upload and manage mixtapes
- **Portfolio** - Manage gallery items
- **Posts** - Create and edit blog posts
- **Media** - Centralized media library
- **Bookings** - View booking inquiries
- **Subscribers** - Manage email list

---

## Content Management

### General Content Management Principles
- All content is stored in the Lovable Cloud backend
- Changes are immediately reflected on the live site
- Use the media library for organized file management
- Always fill in required fields before saving

---

## Managing Events

### Adding a New Event
1. Go to **Admin > Events**
2. Click "Add New Event"
3. Fill in the event details:
   - **Title**: Event name
   - **Venue**: Location of the event
   - **Date**: Event date (YYYY-MM-DD format)
   - **Time**: Event start time (optional)
   - **Event Link**: URL for tickets/more info (optional)
   - **Image**: Upload event flyer or image
4. Click "Add Event"

### Editing an Event
1. Navigate to the Events list
2. Click the "Edit" button on the event you want to modify
3. Update the fields as needed
4. Click "Update Event"

### Deleting an Event
1. Find the event in the list
2. Click the "Delete" button
3. Confirm the deletion

**Note**: Events are displayed on the homepage in chronological order.

---

## Managing Mixtapes

### Adding a New Mixtape
1. Go to **Admin > Mixtapes**
2. Click "Add New Mixtape"
3. Enter mixtape details:
   - **Title**: Name of the mixtape
   - **Slug**: URL-friendly identifier (e.g., "summer-vibes-2024")
   - **Genre**: Musical genre
   - **Vibe**: Mood category (e.g., "High Energy", "Chill", "Late Night")
   - **Duration**: Length in seconds
   - **Release Date**: Publication date
   - **Featured**: Toggle to feature on homepage
   - **Cover Image**: Upload artwork
   - **Audio File**: Upload MP3/audio file directly from your device
   - **Tracklist**: Add track information (optional JSON format)
4. Click "Add Mixtape"

### Editing Mixtapes
- Similar to events, click "Edit" on any mixtape to modify details
- You can update audio files and covers as needed

### Mixtape Display
- Featured mixtapes appear prominently on the homepage
- All mixtapes are accessible from the Mixtapes page
- Play counts and download statistics are tracked automatically

---

## Portfolio Management

### Adding Portfolio Items
1. Navigate to **Admin > Portfolio**
2. Click "Add New Item"
3. Fill in:
   - **Title**: Item name
   - **Type**: photo, video, or flyer
   - **Event Name**: Associated event (optional)
   - **Event Date**: When it occurred (optional)
   - **Media File**: Upload the image or video
   - **Thumbnail**: Optional custom thumbnail
4. Click "Add Item"

### Managing Portfolio
- Edit or delete items as needed
- Portfolio items display in a grid on the Portfolio page
- Organize by event or date for easy browsing

---

## Blog Posts

### Creating a New Post
1. Go to **Admin > Posts**
2. Click "Create New Post"
3. Enter post details:
   - **Title**: Post headline
   - **Slug**: URL identifier
   - **Content**: Main post text (supports markdown)
   - **Category**: Post category (e.g., "News", "Releases", "Events")
   - **Featured Image**: Header image for the post
   - **Published**: Toggle to make post live
   - **Published Date**: When to show as published
4. Click "Save Post"

### Managing Posts
- Draft posts are not visible to the public
- Toggle "Published" to make posts live
- Edit or delete posts from the Posts list

---

## Media Library

The Media Library provides centralized file management for all uploaded content.

### Uploading Media
1. Go to **Admin > Media**
2. Click "Upload Media"
3. Select file(s) from your device
4. Add metadata:
   - **Title**: Descriptive name
   - **Alt Text**: For accessibility
   - **Category**: Organize by type
5. Click "Upload"

### Using Media
- Reference uploaded files in events, posts, portfolio
- Edit file details (title, alt text) after upload
- Delete unused media to save storage space

### Supported File Types
- Images: JPG, PNG, GIF, WebP
- Audio: MP3, WAV, M4A
- Video: MP4, WebM
- Documents: PDF

---

## Bookings Management

### Viewing Bookings
1. Navigate to **Admin > Bookings**
2. View all booking inquiries in a table format

### Booking Information Includes
- Client name and contact details
- Event type and date
- Location and expected attendance
- Budget range
- Special requests/messages
- Booking status

### Managing Booking Status
- Update status: Pending, Confirmed, Completed, Cancelled
- Filter bookings by status
- Export bookings for external management (if needed)

**Note**: Booking form submissions trigger automatic email notifications.

---

## Subscribers Management

### Viewing Subscribers
1. Go to **Admin > Subscribers**
2. View complete email list with subscription dates and sources

### Subscriber Sources
- Newsletter signup form
- Email-gated mixtape downloads
- Booking form subscriptions

### Managing Subscribers
- View subscriber count and growth
- Export email list for marketing campaigns
- Remove unsubscribed users

**Privacy Note**: Handle subscriber data according to privacy regulations.

---

## Technical Information

### Technology Stack
- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS with custom design tokens
- **UI Components**: shadcn/ui + Radix UI
- **Backend**: Lovable Cloud (Supabase)
- **Routing**: React Router v6
- **Forms**: React Hook Form + Zod validation
- **State Management**: TanStack Query

### Project Structure
```
/src
├── /components       # Reusable UI components
├── /pages           # Route pages
│   └── /admin       # Admin panel pages
├── /hooks           # Custom React hooks
├── /lib             # Utility functions
├── /integrations    # Backend integration
└── /assets          # Static assets
```

### Database Tables
- **events**: Event listings
- **mixtapes**: Audio content and metadata
- **portfolio**: Gallery items
- **posts**: Blog articles
- **media_library**: Uploaded files
- **bookings**: Booking inquiries
- **subscribers**: Email list
- **listen_events**: Analytics tracking
- **listening_progress**: User playback positions
- **quotes**: Booking quote calculations

### Design System
All styling uses semantic tokens from `index.css` and `tailwind.config.ts`:
- Colors: HSL values for consistency
- Brand colors: Black, White, Vibrant Red
- Typography: Defined font families and scales
- Spacing: Consistent spacing system

### Development Commands
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Deployment
- Frontend changes require clicking "Update" in the publish dialog
- Backend changes (database, edge functions) deploy automatically
- Access deployment settings via the Publish button

### Support & Troubleshooting

#### Common Issues

**Can't Login to Admin Panel**
- Verify you're using the correct secret code: `@dm1n-v01ce`
- Check browser console for errors
- Clear browser cache and cookies

**Media Upload Fails**
- Check file size (max recommended: 50MB for audio, 10MB for images)
- Verify file format is supported
- Ensure stable internet connection

**Changes Not Appearing**
- Clear browser cache
- Verify you clicked "Save" or "Update"
- Check if item is marked as "Published" (for posts/mixtapes)

**Performance Issues**
- Optimize large images before uploading
- Consider upgrading instance size in Cloud settings
- Monitor database query performance

### Security Best Practices
- Keep admin secret code confidential
- Regularly review subscriber data handling
- Monitor booking submissions for spam
- Keep authentication credentials secure
- Review and update RLS policies as needed

### Backup & Recovery
- Database is automatically backed up by Lovable Cloud
- Export important data regularly through admin panel
- Keep local copies of media files before upload

---

## Additional Resources

### Getting Help
- Check [Lovable Documentation](https://docs.lovable.dev/)
- Visit [Lovable Discord Community](https://discord.gg/lovable)
- Review project README.md for development setup

### Best Practices
1. **Regular Updates**: Keep content fresh with new mixtapes and posts
2. **SEO**: Use descriptive titles and alt text for all media
3. **Mobile-First**: Test all changes on mobile devices
4. **Performance**: Optimize images and audio files before upload
5. **Engagement**: Respond promptly to booking inquiries
6. **Analytics**: Monitor listen events and download statistics

### Content Strategy Tips
- Post new mixtapes regularly to keep audience engaged
- Update events section with upcoming shows
- Share behind-the-scenes content in blog posts
- Use portfolio to showcase best work
- Leverage email list for important announcements

---

## Version Information
- **Current Version**: 1.0.0
- **Last Updated**: November 2025
- **Project URL**: https://lovable.dev/projects/5c52a7ee-baad-476f-944b-fe48f2deab1a

---

## Contact & Support
For technical issues or questions about this website, refer to the project documentation or contact your development team.

**DJ Voice - "Voice of the world"**  
📍 Akosombo, Ghana
