# BITS CRM — Sales, Marketing, Funnel & Automation Platform
## Principal Full-Stack Engineering + Principal SaaS UI/UX Build Prompt

Act as a:

- Principal Full-Stack Engineer
- Principal SaaS Product Designer
- Principal UI/UX Engineer
- CRM / RevOps Architect
- Marketing Automation Engineer
- Database Architect
- Security Engineer
- QA Engineer

Build a complete internal CRM and sales/marketing platform for:

# BITS — Boundless IT Solutions

The system must exist inside the SAME PROJECT / DIRECTORY as the current BITS public website.

The public website and CRM must share:

- branding
- design tokens
- typography
- authentication architecture where appropriate
- reusable components
- common infrastructure

But the CRM must have its own authenticated application shell.

Do not create a disconnected prototype.

Build production-quality architecture.

---

# 1. OBJECTIVE

BITS needs an internal platform for managing:

- Leads
- Contacts
- Companies
- Sales opportunities
- Sales pipelines
- Marketing funnels
- Lead sources
- Lead capture
- Email marketing
- SMS marketing
- Automated sequences
- Workflow automation
- Tasks
- Notes
- Follow-ups
- Activities
- Campaigns
- Segmentation
- Templates
- Conversion tracking
- Sales analytics
- Marketing analytics
- Team performance
- Communication history

The product should provide the most useful CRM and marketing capabilities commonly found in systems such as:

- GoHighLevel
- HubSpot
- Pipedrive
- ActiveCampaign

However:

DO NOT copy proprietary UI, branding, source code, layouts, or terminology unnecessarily.

Build a distinct:

# BITS CRM

designed specifically around BITS sales and marketing operations.

---

# 2. FIRST — AUDIT THE CURRENT PROJECT

Before writing code:

1. Inspect the entire repository.
2. Detect:
   - frontend framework
   - routing
   - package manager
   - database
   - authentication
   - existing API structure
   - UI framework
   - design tokens
   - BITS assets
   - environment configuration
3. Reuse working architecture where appropriate.
4. Avoid replacing existing infrastructure unnecessarily.
5. Identify the public marketing pages.
6. Keep CRM routes clearly separated.

Preferred route structure:

```txt
/
    Public BITS website

/login
/forgot-password

/app
/app/dashboard
/app/leads
/app/contacts
/app/companies
/app/opportunities
/app/pipelines
/app/tasks
/app/conversations
/app/campaigns
/app/automations
/app/funnels
/app/forms
/app/templates
/app/reports
/app/team
/app/settings