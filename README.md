# Premier Relationship Manager Website

A professional personal branding website for Premier/Wealth Relationship Managers built with Next.js, TypeScript, and Tailwind CSS.

## Features

- **Responsive Design**: Mobile-first approach with breakpoints for all device sizes
- **Sticky Navigation**: Professional navbar with smooth mobile hamburger menu
- **Hero Section**: Full viewport hero with profile and action card
- **Tabbed Forms**: Three interactive forms for different client interactions
- **Form Validation**: Client-side validation with error handling
- **Accessibility**: WCAG compliant with keyboard navigation and ARIA labels

## Project Structure

```
app/
  layout.tsx          # Root layout with metadata
  page.tsx           # Home page with Navbar and HeroSection
  globals.css        # Global styles and CSS custom properties

components/
  navbar/
    Navbar.tsx       # Sticky navigation with mobile menu
  hero/
    HeroSection.tsx  # Main hero container
    LeftProfile.tsx  # Profile image, headline, and services
    RightActionCard.tsx # Card container for tabs
    Tabs.tsx         # Accessible tab component
    forms/
      AppointmentForm.tsx    # Appointment booking form
      ConsultForm.tsx        # Online consultation form
      SupportTicketForm.tsx  # Support ticket form

lib/
  validators.ts      # Form validation utilities
```

## Customization

### Content Updates
- **Profile Information**: Edit `components/hero/LeftProfile.tsx` to update name, image, and service bullets
- **Contact Copy**: Modify form labels and placeholders in the respective form components
- **Navigation**: Update menu items in `components/navbar/Navbar.tsx`

### Styling
- **Color Tokens**: Update CSS custom properties in `app/globals.css`
- **Component Styles**: Modify Tailwind classes in individual components
- **Responsive Breakpoints**: Adjust grid layouts and spacing as needed

### Analytics
All CTA buttons include `data-analytics` attributes for tracking:
- `hero.tab.appointment`
- `hero.tab.consult` 
- `hero.tab.support_ticket`
- `hero.cta.submit`

## Backend Integration Points

When ready to connect to a backend:

1. **Form Submissions**: Replace `console.log()` calls in form components with actual API calls
2. **File Uploads**: Implement file upload logic in `SupportTicketForm.tsx`
3. **Email Notifications**: Add email service integration for form submissions
4. **Database**: Store appointment, consultation, and support ticket data
5. **Authentication**: Add user authentication if needed for premium features

## Development

```bash
npm run dev    # Start development server
npm run build  # Build for production
npm run start  # Start production server
```

## Accessibility Features

- Keyboard navigation for all interactive elements
- ARIA labels and roles for screen readers
- Focus management and visual indicators
- Semantic HTML structure
- Color contrast compliance

## Form Validation

- **Required Fields**: Client-side validation for all required inputs
- **Email Format**: Email validation using regex
- **Phone Format**: Vietnamese phone number validation
- **Date Validation**: Ensures appointment dates are today or future
- **Minimum Length**: Description fields have minimum character requirements