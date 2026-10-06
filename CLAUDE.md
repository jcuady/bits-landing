@AGENTS.md


<skills_system priority="1">

## Available Skills

<!-- SKILLS_TABLE_START -->
<usage>
When users ask you to perform tasks, check if any of the available skills below can help complete the task more effectively. Skills provide specialized capabilities and domain knowledge.

How to use skills:
- Invoke: `skillkit read <skill-name>` or `npx skillkit read <skill-name>`
- The skill content will load with detailed instructions on how to complete the task
- Base directory provided in output for resolving bundled resources (references/, scripts/, assets/)

Usage notes:
- Only use skills listed in <available_skills> below
- Do not invoke a skill that is already loaded in your context
- Each skill invocation is stateless
</usage>

<available_skills>

<skill>
<name>ab-testing</name>
<description>When the user wants to plan, design, or implement an A/B test or experiment, or build a growth experimentation program. Also use when the user mentions &quot;A/B test,&quot; &quot;split test,&quot; &quot;experiment,&quot; &quot;test this change,&quot; &quot;variant copy,&quot; &quot;multivariate test,&quot; &quot;hypothesis,&quot; &quot;should I test this,&quot; &quot;which version is better,&quot; &quot;test two versions,&quot; &quot;statistical significance,&quot; &quot;how long should I run this test,&quot; &quot;growth experiments,&quot; &quot;experiment velocity,&quot; &quot;experiment backlog,&quot; &quot;ICE score,&quot; &quot;experimentation program,&quot; or &quot;experiment playbook.&quot; Use this whenever someone is comparing two approaches and wants to measure which performs better, or when they want to build a systematic experimentation practice. For tracking implementation, see analytics. For page-level conversion optimization, see cro.</description>
<location>global</location>
</skill>

<skill>
<name>ad-creative</name>
<description>When the user wants to generate, iterate, or scale ad creative — headlines, descriptions, primary text, or full ad variations — for any paid advertising platform. Also use when the user mentions &apos;ad copy variations,&apos; &apos;ad creative,&apos; &apos;generate headlines,&apos; &apos;RSA headlines,&apos; &apos;bulk ad copy,&apos; &apos;ad iterations,&apos; &apos;creative testing,&apos; &apos;write me some ads,&apos; &apos;Facebook ad copy,&apos; &apos;Google ad headlines,&apos; &apos;LinkedIn ad text,&apos; &apos;static ads,&apos; &apos;ad templates,&apos; &apos;iMessage ad,&apos; &apos;chat reveal ad,&apos; &apos;ChatGPT ad,&apos; &apos;Apple Notes ad,&apos; &apos;AirDrop ad,&apos; &apos;creative strategy,&apos; &apos;creative roadmap,&apos; &apos;creative retro,&apos; &apos;hook writing,&apos; &apos;creative review page,&apos; &apos;present ad creative for approval,&apos; &apos;motion video ad,&apos; &apos;faceless video ad,&apos; &apos;UGC ad,&apos; &apos;greenscreen ad,&apos; &apos;TikTok/Reels ad format,&apos; &apos;which ad format to make,&apos; &apos;Meta ad format tier list,&apos; or &apos;creative format taxonomy.&apos; Use it to produce or iterate ad copy at scale. Copy avoids AI tells like &apos;it&apos;s not X, it&apos;s Y&apos; reveals. For campaign strategy and targeting, see ads. For landing page copy, see copywriting.</description>
<location>global</location>
</skill>

<skill>
<name>ads</name>
<description>When the user wants help with paid advertising campaigns on Google Ads, Meta (Facebook/Instagram), LinkedIn, Twitter/X, or other ad platforms. Also use when the user mentions &apos;PPC,&apos; &apos;paid media,&apos; &apos;ROAS,&apos; &apos;CPA,&apos; &apos;ad campaign,&apos; &apos;retargeting,&apos; &apos;audience targeting,&apos; &apos;Google Ads,&apos; &apos;Facebook ads,&apos; &apos;LinkedIn ads,&apos; &apos;ad budget,&apos; &apos;cost per click,&apos; &apos;ad spend,&apos; &apos;should I run ads,&apos; &apos;ABM,&apos; &apos;account-based marketing,&apos; &apos;B2B ads,&apos; &apos;lead quality,&apos; &apos;negative keywords,&apos; &apos;Performance Max,&apos; &apos;thought leader ads,&apos; &apos;when should I kill an ad,&apos; &apos;search terms report,&apos; &apos;wasted spend,&apos; or &apos;is this campaign working.&apos; Use this for campaign strategy, audience targeting, bidding, and optimization. For bulk ad creative generation and iteration, see ad-creative. For landing page optimization, see cro.</description>
<location>global</location>
</skill>

<skill>
<name>ai-seo</name>
<description>When the user wants to optimize content for AI search engines, get cited by LLMs, or appear in AI-generated answers. Also use when the user mentions &apos;AI SEO,&apos; &apos;AEO,&apos; &apos;GEO,&apos; &apos;LLMO,&apos; &apos;answer engine optimization,&apos; &apos;generative engine optimization,&apos; &apos;LLM optimization,&apos; &apos;AI Overviews,&apos; &apos;optimize for ChatGPT,&apos; &apos;optimize for Perplexity,&apos; &apos;AI citations,&apos; &apos;AI visibility,&apos; &apos;zero-click search,&apos; &apos;how do I show up in AI answers,&apos; &apos;LLM mentions,&apos; &apos;optimize for Claude/Gemini,&apos; &apos;llms.txt,&apos; &apos;llms-full.txt,&apos; &apos;OKF,&apos; &apos;Open Knowledge Format,&apos; &apos;knowledge bundle,&apos; &apos;agent-readable site,&apos; &apos;agent readiness,&apos; &apos;is my site agent-ready,&apos; &apos;WebMCP,&apos; &apos;do listicles still work for AI,&apos; &apos;ChatGPT stopped citing comparison pages,&apos; &apos;how do LLMs see our brand,&apos; &apos;LinkedIn for AEO,&apos; or &apos;AI citation format shift.&apos; Use this whenever someone wants their content to be cited or surfaced by AI assistants and AI search engines. For traditional technical and on-page SEO audits, see seo-audit. For structured data implementation, see schema.</description>
<location>global</location>
</skill>

<skill>
<name>analytics</name>
<description>When the user wants to set up, improve, or audit analytics tracking and measurement. Also use when the user mentions &quot;set up tracking,&quot; &quot;GA4,&quot; &quot;Google Analytics,&quot; &quot;conversion tracking,&quot; &quot;event tracking,&quot; &quot;UTM parameters,&quot; &quot;tag manager,&quot; &quot;GTM,&quot; &quot;analytics implementation,&quot; &quot;tracking plan,&quot; &quot;how do I measure this,&quot; &quot;track conversions,&quot; &quot;Mixpanel,&quot; &quot;Segment,&quot; &quot;are my events firing,&quot; or &quot;analytics isn&apos;t working.&quot; Use this whenever someone asks how to know if something is working or wants to measure marketing results. For choosing attribution models, comparing multi-touch/MMM/incrementality, or reconciling conflicting numbers across tools, see attribution. For A/B test measurement, see ab-testing.</description>
<location>global</location>
</skill>

<skill>
<name>api-designer</name>
<description>Designs REST/API contracts, error shapes, pagination, and versioning. Use when adding or changing endpoints, OpenAPI-style contracts, or API auth patterns. Invoke as api-designer. Do not introduce GraphQL unless the user asks.</description>
<location>global</location>
</skill>

<skill>
<name>aso</name>
<description>When the user wants to audit or optimize an App Store or Google Play listing. Also use when the user mentions &apos;ASO audit,&apos; &apos;app store optimization,&apos; &apos;optimize my app listing,&apos; &apos;improve app visibility,&apos; &apos;app store ranking,&apos; &apos;audit my listing,&apos; &apos;why aren&apos;t people downloading my app,&apos; &apos;improve my app conversion,&apos; &apos;keyword optimization for app,&apos; or &apos;compare my app to competitors.&apos; Use when the user shares an App Store or Google Play URL and wants to improve it.</description>
<location>global</location>
</skill>

<skill>
<name>attribution</name>
<description>When the user wants to figure out which marketing actually drives conversions and revenue, choose or interpret an attribution model, or reconcile conflicting numbers across tools. Also use when the user mentions &quot;attribution,&quot; &quot;attribution model,&quot; &quot;first-touch vs last-touch,&quot; &quot;multi-touch,&quot; &quot;which channel drives revenue,&quot; &quot;what&apos;s my real CAC,&quot; &quot;my dashboards disagree,&quot; &quot;Google/Meta says X but GA says Y,&quot; &quot;media mix model,&quot; &quot;MMM,&quot; &quot;incrementality,&quot; &quot;geo lift,&quot; &quot;holdout test,&quot; &quot;how did you hear about us,&quot; &quot;self-reported attribution,&quot; &quot;dark social,&quot; or wants to instrument attribution themselves — &quot;stitch my bookings to their source,&quot; &quot;SavvyCal/Calendly attribution,&quot; &quot;close the identify gap,&quot; &quot;track conversions on a third-party domain,&quot; &quot;first-party / self-hosted attribution.&quot; For event tracking setup and UTMs, see analytics. For ad-platform pixels/CAPI, see ads. For pipeline and CRM revenue reporting, see revops. For the AI-search attribution blind spot, see ai-seo.</description>
<location>global</location>
</skill>

<skill>
<name>backend-developer</name>
<description>Builds server-side APIs, schema, RLS, auth, and production backend. Use when implementing APIs, migrations, indexes, caching, or backend architecture. Invoke as backend-developer.</description>
<location>global</location>
</skill>

<skill>
<name>banner-design</name>
<description>Design banners for social media, ads, website heroes, creative assets, and print. Multiple art direction options with AI-generated visuals. Actions: design, create, generate banner. Platforms: Facebook, Twitter/X, LinkedIn, YouTube, Instagram, Google Display, website hero, print. Styles: minimalist, gradient, bold typography, photo-based, illustrated, geometric, retro, glassmorphism, 3D, neon, duotone, editorial, collage. Uses ui-ux-pro-max, frontend-design, ai-artist, ai-multimodal skills.</description>
<location>global</location>
</skill>

<skill>
<name>brand</name>
<description>Brand voice, visual identity, messaging frameworks, asset management, brand consistency. Activate for branded content, tone of voice, marketing assets, brand compliance, style guides.</description>
<location>global</location>
</skill>

<skill>
<name>churn-prevention</name>
<description>When the user wants to reduce churn, build cancellation flows, set up save offers, recover failed payments, or implement retention strategies. Also use when the user mentions &apos;churn,&apos; &apos;cancel flow,&apos; &apos;offboarding,&apos; &apos;save offer,&apos; &apos;dunning,&apos; &apos;failed payment recovery,&apos; &apos;win-back,&apos; &apos;retention,&apos; &apos;exit survey,&apos; &apos;pause subscription,&apos; &apos;involuntary churn,&apos; &apos;people keep canceling,&apos; &apos;churn rate is too high,&apos; &apos;how do I keep users,&apos; or &apos;customers are leaving.&apos; Use this whenever someone is losing subscribers or wants to build systems to prevent it. For post-cancel win-back email sequences, see emails. For in-app upgrade paywalls, see paywalls.</description>
<location>global</location>
</skill>

<skill>
<name>co-marketing</name>
<description>When the user wants to find co-marketing partners, plan joint campaigns, or brainstorm partnership opportunities. Use when the user says &apos;co-marketing,&apos; &apos;partner marketing,&apos; &apos;joint campaign,&apos; &apos;who should we partner with,&apos; &apos;integration marketing,&apos; &apos;cross-promotion,&apos; &apos;collaborate with another company,&apos; &apos;partnership ideas,&apos; or &apos;co-brand.&apos; For customer referral programs, see referrals. For launch-specific partnerships, see launch.</description>
<location>global</location>
</skill>

<skill>
<name>cold-email</name>
<description>Write B2B cold emails and follow-up sequences that get replies. Use when the user wants to write cold outreach emails, prospecting emails, cold email campaigns, sales development emails, or SDR emails. Also use when the user mentions &quot;cold outreach,&quot; &quot;prospecting email,&quot; &quot;outbound email,&quot; &quot;email to leads,&quot; &quot;reach out to prospects,&quot; &quot;sales email,&quot; &quot;follow-up email sequence,&quot; &quot;nobody&apos;s replying to my emails,&quot; or &quot;how do I write a cold email.&quot; Covers subject lines, opening lines, body copy, CTAs, personalization, and multi-touch follow-up sequences. Emails avoid AI tells like &apos;it&apos;s not X, it&apos;s Y&apos; reveals and &apos;no X, no Y, no Z&apos; lists. For warm/lifecycle email sequences, see emails. For sales collateral beyond emails, see sales-enablement.</description>
<location>global</location>
</skill>

<skill>
<name>community-marketing</name>
<description>Build and leverage online communities to drive product growth and brand loyalty. Use when the user wants to create a community strategy, grow a Discord or Slack community, manage a forum or subreddit, build brand advocates, increase word-of-mouth, drive community-led growth, engage users post-signup, or turn customers into evangelists. Trigger phrases: &quot;build a community,&quot; &quot;community strategy,&quot; &quot;Discord community,&quot; &quot;Slack community,&quot; &quot;community-led growth,&quot; &quot;brand advocates,&quot; &quot;user community,&quot; &quot;forum strategy,&quot; &quot;community engagement,&quot; &quot;grow our community,&quot; &quot;ambassador program,&quot; &quot;community flywheel.&quot;</description>
<location>global</location>
</skill>

<skill>
<name>competitor-profiling</name>
<description>When the user wants to research, profile, or analyze competitors from their URLs. Also use when the user mentions &apos;competitor profile,&apos; &apos;competitor research,&apos; &apos;competitor analysis,&apos; &apos;profile this competitor,&apos; &apos;analyze competitor,&apos; &apos;competitive intelligence,&apos; &apos;competitor deep dive,&apos; &apos;who are my competitors,&apos; &apos;competitor landscape,&apos; &apos;competitor dossier,&apos; &apos;competitive audit,&apos; or &apos;research these competitors.&apos; Input is a list of competitor URLs. Output is structured competitor profile markdown files. For creating comparison/alternative pages from profiles, see competitors. For sales-specific battle cards, see sales-enablement.</description>
<location>global</location>
</skill>

<skill>
<name>competitors</name>
<description>When the user wants to create competitor comparison or alternative pages for SEO and buyer-facing use. Also use when the user mentions &apos;alternative page,&apos; &apos;vs page,&apos; &apos;competitor comparison,&apos; &apos;comparison page,&apos; &apos;[Product] vs [Product],&apos; &apos;[Product] alternative,&apos; &apos;competitive landing pages,&apos; &apos;how do we compare to X,&apos; &apos;competitor teardown,&apos; &apos;audit our competitor pages,&apos; &apos;are our comparison pages out of date,&apos; or &apos;competitive asset audit.&apos; Use this for any content that positions your product against competitors. Covers four formats: singular alternative, plural alternatives, you vs competitor, and competitor vs competitor. For auditing existing claims (not researching competitors from scratch, which is competitor-profiling; not technical SEO on these pages, which is seo-audit), use the asset audit here. For internal battle cards and sales-specific competitor docs, see sales-enablement.</description>
<location>global</location>
</skill>

<skill>
<name>content-strategy</name>
<description>When the user wants to plan a content strategy, decide what content to create, or figure out what topics to cover. Also use when the user mentions &quot;content strategy,&quot; &quot;what should I write about,&quot; &quot;content ideas,&quot; &quot;blog strategy,&quot; &quot;topic clusters,&quot; &quot;content planning,&quot; &quot;editorial calendar,&quot; &quot;content marketing,&quot; &quot;content roadmap,&quot; &quot;what content should I create,&quot; &quot;blog topics,&quot; &quot;content pillars,&quot; or &quot;I don&apos;t know what to write.&quot; Use this whenever someone needs help deciding what content to produce, not just writing it. For writing individual pieces, see copywriting. For SEO-specific audits, see seo-audit. For social media content specifically, see social.</description>
<location>global</location>
</skill>

<skill>
<name>copy-editing</name>
<description>When the user wants to edit, review, or improve existing marketing copy, or refresh outdated content. Also use when the user mentions &apos;edit this copy,&apos; &apos;review my copy,&apos; &apos;copy feedback,&apos; &apos;proofread,&apos; &apos;polish this,&apos; &apos;make this better,&apos; &apos;copy sweep,&apos; &apos;tighten this up,&apos; &apos;this reads awkwardly,&apos; &apos;clean up this text,&apos; &apos;too wordy,&apos; &apos;sharpen the messaging,&apos; &apos;refresh this content,&apos; &apos;update this page,&apos; &apos;this content is outdated,&apos; or &apos;content audit,&apos; &apos;this sounds like AI,&apos; &apos;AI slop,&apos; &apos;de-slop this,&apos; or &apos;make it sound human.&apos; Use this when the user already has copy and wants it improved or refreshed rather than rewritten from scratch. Every edit removes AI tells such as &apos;it&apos;s not X, it&apos;s Y&apos; reveals, &apos;no X, no Y, no Z&apos; lists, and sentences that trail into extra comma clauses. For writing new copy, see copywriting.</description>
<location>global</location>
</skill>

<skill>
<name>copywriting</name>
<description>When the user wants to write, rewrite, or improve marketing copy for any page, including homepage, landing pages, pricing pages, feature pages, about pages, or product pages. Also use when the user says &quot;write copy for,&quot; &quot;improve this copy,&quot; &quot;rewrite this page,&quot; &quot;marketing copy,&quot; &quot;headline help,&quot; &quot;CTA copy,&quot; &quot;value proposition,&quot; &quot;tagline,&quot; &quot;subheadline,&quot; &quot;hero section copy,&quot; &quot;above the fold,&quot; &quot;this copy is weak,&quot; &quot;make this more compelling,&quot; &quot;this sounds like AI,&quot; &quot;AI slop,&quot; &quot;make it sound human,&quot; or &quot;help me describe my product.&quot; Use this whenever someone is working on website text that needs to persuade or convert. Drafts never use AI tells like &quot;it&apos;s not X, it&apos;s Y&quot; reveals, &quot;no X, no Y, no Z&quot; lists, or sentences that trail into extra comma clauses. For email copy, see emails. For popup copy, see popups. For editing existing copy, see copy-editing. For the offer underneath the copy (bonuses, guarantees, value framing), see offers.</description>
<location>global</location>
</skill>

<skill>
<name>cro</name>
<description>When the user wants to optimize, improve, or increase conversions on any marketing page or form — including homepage, landing pages, pricing pages, feature pages, lead capture forms, or contact forms. Also use when the user says &apos;CRO,&apos; &apos;conversion rate optimization,&apos; &apos;this page isn&apos;t converting,&apos; &apos;improve conversions,&apos; &apos;why isn&apos;t this page working,&apos; &apos;my landing page sucks,&apos; &apos;form abandonment,&apos; &apos;nobody&apos;s converting,&apos; &apos;low conversion rate,&apos; or &apos;this page needs work.&apos; Use this even if the user just shares a URL and asks for feedback. For signup/registration flows, see signup. For post-signup activation, see onboarding. For popups/modals, see popups.</description>
<location>global</location>
</skill>

<skill>
<name>customer-research</name>
<description>When the user wants to conduct, analyze, or synthesize customer research. Use when the user mentions &quot;customer research,&quot; &quot;ICP research,&quot; &quot;talk to customers,&quot; &quot;analyze transcripts,&quot; &quot;customer interviews,&quot; &quot;survey analysis,&quot; &quot;support ticket analysis,&quot; &quot;voice of customer,&quot; &quot;VOC,&quot; &quot;build personas,&quot; &quot;customer personas,&quot; &quot;jobs to be done,&quot; &quot;JTBD,&quot; &quot;what do customers say,&quot; &quot;what are customers struggling with,&quot; &quot;Reddit mining,&quot; &quot;G2 reviews,&quot; &quot;review mining,&quot; &quot;digital watering holes,&quot; &quot;community research,&quot; &quot;forum research,&quot; &quot;competitor reviews,&quot; &quot;customer sentiment,&quot; &quot;PMF survey,&quot; &quot;product/market fit survey,&quot; &quot;customer interview questions,&quot; &quot;interview outreach,&quot; &quot;Sales Safari,&quot; or &quot;find out why customers churn/convert/buy.&quot; Use for analyzing existing research assets, mining online sources, AND running primary research (interviews and surveys). For writing copy informed by research, see copywriting. For acting on research to improve pages, see cro.</description>
<location>global</location>
</skill>

<skill>
<name>design</name>
<description>Comprehensive design skill: brand identity, design tokens, UI styling, logo generation (55 styles, Gemini AI), corporate identity program (50 deliverables, CIP mockups), HTML presentations (Chart.js), banner design (22 styles, social/ads/web/print), icon design (15 styles, SVG, Gemini 3.1 Pro), social photos (HTML→screenshot, multi-platform). Actions: design logo, create CIP, generate mockups, build slides, design banner, generate icon, create social photos, social media images, brand identity, design system. Platforms: Facebook, Twitter, LinkedIn, YouTube, Instagram, Pinterest, TikTok, Threads, Google Ads.</description>
<location>global</location>
</skill>

<skill>
<name>design-system</name>
<description>Token architecture, component specifications, and slide generation. Three-layer tokens (primitive→semantic→component), CSS variables, spacing/typography scales, component specs, strategic slide creation. Use for design tokens, systematic design, brand-compliant presentations.</description>
<location>global</location>
</skill>

<skill>
<name>diagnosing-bugs</name>
<description>Diagnosis loop for hard bugs and performance regressions. Use when the user says &quot;diagnose&quot;/&quot;debug this&quot;, or reports something broken/throwing/failing/slow.</description>
<location>global</location>
</skill>

<skill>
<name>directory-submissions</name>
<description>When the user wants to submit their product to startup, SaaS, AI, agent, MCP, no-code, or review directories for backlinks, domain rating, and discovery. Also use when the user mentions &quot;directory submissions,&quot; &quot;submit to directories,&quot; &quot;backlinks from directories,&quot; &quot;list my product,&quot; &quot;submit to Product Hunt,&quot; &quot;BetaList,&quot; &quot;TAAFT,&quot; &quot;Futurepedia,&quot; &quot;G2 listing,&quot; &quot;Capterra listing,&quot; &quot;AlternativeTo,&quot; &quot;SaaSHub,&quot; &quot;AI directories,&quot; &quot;MCP registry,&quot; &quot;publish my MCP server,&quot; &quot;awesome list,&quot; &quot;llms.txt directory,&quot; &quot;Claude plugin directory,&quot; &quot;agent directory,&quot; &quot;dofollow backlinks,&quot; &quot;launch directories,&quot; or &quot;directory tracker.&quot; Use this whenever someone is planning the directory layer of a product launch or an ongoing backlink campaign. For the broader launch moment, see launch. For programmatic SEO pages that should live behind these backlinks, see programmatic-seo. For AI citation optimization, see ai-seo.</description>
<location>global</location>
</skill>

<skill>
<name>emails</name>
<description>When the user wants to create or optimize an email sequence, drip campaign, automated email flow, or lifecycle email program. Also use when the user mentions &quot;email sequence,&quot; &quot;drip campaign,&quot; &quot;nurture sequence,&quot; &quot;onboarding emails,&quot; &quot;welcome sequence,&quot; &quot;re-engagement emails,&quot; &quot;email automation,&quot; &quot;lifecycle emails,&quot; &quot;trigger-based emails,&quot; &quot;email funnel,&quot; &quot;email workflow,&quot; &quot;what emails should I send,&quot; &quot;welcome series,&quot; or &quot;email cadence.&quot; Use this for any multi-email automated flow. Emails avoid AI tells like &apos;it&apos;s not X, it&apos;s Y&apos; reveals, &apos;no X, no Y, no Z&apos; lists, and fake &apos;Re:&apos; subject lines. For cold outreach emails, see cold-email. For in-app onboarding, see onboarding.</description>
<location>global</location>
</skill>

<skill>
<name>events</name>
<description>When the user wants to plan, run, sponsor, speak at, or get pipeline from events — webinars, conferences, trade shows, meetups, dinners, workshops, virtual summits, or user conferences. Also use when the user mentions &apos;event marketing,&apos; &apos;field marketing,&apos; &apos;run a webinar,&apos; &apos;webinar funnel,&apos; &apos;show-up rate,&apos; &apos;should we sponsor,&apos; &apos;sponsor a conference,&apos; &apos;trade show booth,&apos; &apos;booth strategy,&apos; &apos;event ROI,&apos; &apos;badge scans,&apos; &apos;event follow-up,&apos; &apos;speaking slot,&apos; &apos;CFP,&apos; &apos;conference talk,&apos; &apos;host a dinner,&apos; &apos;user conference,&apos; or &apos;virtual summit.&apos; Covers all four roles: hosting, sponsoring/exhibiting, speaking, and attending. For product launch moments, see launch. For the partnership side of joint webinars, see co-marketing. For ongoing community programs, see community-marketing. For podcast appearances, see public-relations. For the email sequences themselves, see emails.</description>
<location>global</location>
</skill>

<skill>
<name>finish-goal</name>
<description>No description available</description>
<location>global</location>
</skill>

<skill>
<name>free-tools</name>
<description>When the user wants to plan, evaluate, or build a free tool for marketing purposes — lead generation, SEO value, or brand awareness. Also use when the user mentions &quot;engineering as marketing,&quot; &quot;free tool,&quot; &quot;marketing tool,&quot; &quot;calculator,&quot; &quot;generator,&quot; &quot;interactive tool,&quot; &quot;lead gen tool,&quot; &quot;build a tool for leads,&quot; &quot;free resource,&quot; &quot;ROI calculator,&quot; &quot;grader tool,&quot; &quot;audit tool,&quot; &quot;should I build a free tool,&quot; or &quot;tools for lead gen.&quot; Use this whenever someone wants to build something useful and give it away to attract leads or earn links. For downloadable content lead magnets (ebooks, checklists, templates), see lead-magnets.</description>
<location>global</location>
</skill>

<skill>
<name>fullstack-developer</name>
<description>Builds complete features across database, API, and UI as one unit. Use when a change spans schema, API, and frontend, or when the user asks for end-to-end feature work. Invoke as fullstack-developer.</description>
<location>global</location>
</skill>

<skill>
<name>image</name>
<description>When the user wants to create, generate, edit, or optimize images for marketing — blog heroes, social graphics, product mockups, profile banners, listing visuals, or brand assets. Also use when the user mentions &apos;AI image generation,&apos; &apos;generate an image,&apos; &apos;create a graphic,&apos; &apos;product mockup,&apos; &apos;hero image,&apos; &apos;social media graphic,&apos; &apos;banner image,&apos; &apos;cover photo,&apos; &apos;profile banner,&apos; &apos;listing screenshot,&apos; &apos;Flux,&apos; &apos;Flux Kontext,&apos; &apos;Midjourney,&apos; &apos;DALL-E,&apos; &apos;GPT Image,&apos; &apos;ChatGPT Images,&apos; &apos;Ideogram,&apos; &apos;Gemini image,&apos; &apos;Nano Banana,&apos; &apos;Recraft,&apos; &apos;Stable Diffusion,&apos; &apos;Canva,&apos; &apos;Figma,&apos; &apos;image optimization,&apos; &apos;compress images,&apos; &apos;WebP,&apos; or &apos;OG image.&apos; Use this for general-purpose marketing image creation and optimization. For paid ad image creative and platform-specific ad specs, see ad-creative. For video production, see video.</description>
<location>global</location>
</skill>

<skill>
<name>influencer-marketing</name>
<description>When the user wants to run influencer, creator, or ambassador partnerships to promote their product — finding and vetting partners, structuring deals, briefing creators, disclosure compliance, and measuring ROI. Also use when the user mentions &apos;influencer marketing,&apos; &apos;creator partnerships,&apos; &apos;sponsorships,&apos; &apos;YouTube sponsorships,&apos; &apos;podcast sponsorships,&apos; &apos;brand ambassador,&apos; &apos;ambassador program,&apos; &apos;creator program,&apos; &apos;UGC creators,&apos; &apos;tech UGC,&apos; &apos;UGC creator program,&apos; &apos;creator network,&apos; &apos;B2B influencers,&apos; &apos;thought leader ads,&apos; &apos;gifting,&apos; &apos;product seeding,&apos; &apos;whitelisting creator content,&apos; &apos;how much to pay an influencer,&apos; or &apos;FTC disclosure.&apos; For affiliate/referral payout mechanics, see referrals. For community-led advocacy, see community-marketing. For turning creator content into paid ads, see ad-creative.</description>
<location>global</location>
</skill>

<skill>
<name>karpathy-skills</name>
<description>No description available</description>
<location>global</location>
</skill>

<skill>
<name>launch</name>
<description>When the user wants to plan a product launch, feature announcement, or release strategy. Also use when the user mentions &apos;launch,&apos; &apos;Product Hunt,&apos; &apos;feature release,&apos; &apos;announcement,&apos; &apos;go-to-market,&apos; &apos;beta launch,&apos; &apos;early access,&apos; &apos;waitlist,&apos; &apos;product update,&apos; &apos;how do I launch this,&apos; &apos;launch checklist,&apos; &apos;GTM plan,&apos; or &apos;we&apos;re about to ship.&apos; Use this whenever someone is preparing to release something publicly. For ongoing marketing after launch, see marketing-ideas. For the offer being launched (bonuses, guarantees, scarcity, naming), see offers.</description>
<location>global</location>
</skill>

<skill>
<name>lead-magnets</name>
<description>When the user wants to create, plan, or optimize a lead magnet for email capture or lead generation. Also use when the user mentions &quot;lead magnet,&quot; &quot;gated content,&quot; &quot;content upgrade,&quot; &quot;downloadable,&quot; &quot;ebook,&quot; &quot;cheat sheet,&quot; &quot;checklist,&quot; &quot;template download,&quot; &quot;opt-in,&quot; &quot;freebie,&quot; &quot;PDF download,&quot; &quot;resource library,&quot; &quot;content offer,&quot; &quot;email capture content,&quot; &quot;Notion template,&quot; &quot;spreadsheet template,&quot; or &quot;what should I give away for emails.&quot; Use this for planning what to create and how to distribute it. For interactive tools as lead magnets, see free-tools. For writing the actual content, see copywriting. For the email sequence after capture, see emails.</description>
<location>global</location>
</skill>

<skill>
<name>logo-generator</name>
<description>Generate professional SVG logos and high-end showcase images. Use when the user wants to: (1) Create a logo or icon for their product/brand, (2) Generate logo design concepts based on product information, (3) Create professional logo showcase presentations with multiple background styles, (4) Export logos in various formats (SVG, PNG), or (5) Iterate on logo designs with different visual styles. Supports geometric patterns, dot matrix designs, line systems, and mixed compositions. Generates showcase images using Nano Banana (Gemini image generation) with 12 professional background styles.
</description>
<location>global</location>
</skill>

<skill>
<name>marketing-council</name>
<description>When the user wants multiple expert perspectives on a marketing question — a simulated board of advisors staffed by legendary marketers (Seth Godin, David Ogilvy, Eugene Schwartz, April Dunford, Rory Sutherland, Alex Hormozi, Byron Sharp, and more). Also use when the user mentions &apos;marketing council,&apos; &apos;board of advisors,&apos; &apos;advisory board,&apos; &apos;what would Seth Godin say,&apos; &apos;what would Ogilvy think,&apos; &apos;channel Hormozi,&apos; &apos;get multiple perspectives,&apos; &apos;debate this,&apos; &apos;have the council review,&apos; &apos;marketing mentors,&apos; or asks how a famous marketer would approach their problem. The council gives each advisor&apos;s take through their documented frameworks, surfaces where they disagree, and synthesizes a recommendation. For executing the winning direction, hand off to positioning, offers, copywriting, ads, or the relevant skill.</description>
<location>global</location>
</skill>

<skill>
<name>marketing-ideas</name>
<description>When the user needs marketing ideas, inspiration, or strategies for their SaaS or software product. Also use when the user asks for &apos;marketing ideas,&apos; &apos;growth ideas,&apos; &apos;how to market,&apos; &apos;marketing strategies,&apos; &apos;marketing tactics,&apos; &apos;ways to promote,&apos; &apos;ideas to grow,&apos; &apos;what else can I try,&apos; &apos;I don&apos;t know how to market this,&apos; &apos;brainstorm marketing,&apos; or &apos;what marketing should I do.&apos; Use this as a starting point whenever someone is stuck or looking for inspiration on how to grow. For specific channel execution, see the relevant skill (ads, social, emails, etc.).</description>
<location>global</location>
</skill>

<skill>
<name>marketing-loops</name>
<description>When the user wants to set up a recurring, self-running marketing workflow — a repeatable loop an AI agent runs on a cadence (weekly, daily, on a trigger) rather than a one-off task. Also use when the user mentions &apos;marketing loop,&apos; &apos;recurring marketing workflow,&apos; &apos;automate my marketing,&apos; &apos;marketing on autopilot,&apos; &apos;weekly marketing review,&apos; &apos;ad fatigue check,&apos; &apos;content refresh loop,&apos; &apos;churn watch,&apos; &apos;ranking drop alert,&apos; &apos;always-on marketing,&apos; &apos;marketing automation workflow,&apos; or &apos;run this every week.&apos; Use this to pick, adapt, and schedule an ongoing marketing loop that orchestrates the other marketing skills. For one-off marketing ideas, see marketing-ideas. For the experimentation loop specifically, see ab-testing.</description>
<location>global</location>
</skill>

<skill>
<name>marketing-plan</name>
<description>When the user needs a comprehensive marketing plan for a client, a company they advise, or their own product. Also use when the user mentions &quot;marketing plan,&quot; &quot;growth plan,&quot; &quot;GTM plan,&quot; &quot;go-to-market plan,&quot; &quot;AARRR plan,&quot; &quot;90-day marketing plan,&quot; &quot;12-month marketing roadmap,&quot; &quot;fractional CMO plan,&quot; &quot;fCMO plan,&quot; &quot;market sizing,&quot; &quot;TAM SAM SOM,&quot; &quot;how big is this market,&quot; or &quot;market research.&quot; Generates an exhaustive 13-section plan structured by AARRR (Acquisition, Activation, Retention, Referral, Revenue), customized to the client&apos;s current budget, team, and stage, mapped to future funding milestones, cross-referenced with the 139-idea marketing-ideas library and an embedded 17-section current-state audit rubric, with a marketing operations stack showing which skills and MCP/API integrations execute each part. Outputs a Notion-paste-ready markdown document. For positioning and ICP context before planning, see product-marketing. For stage-specific deep work, see onboarding, signup, emails, referrals, pricing.</description>
<location>global</location>
</skill>

<skill>
<name>marketing-psychology</name>
<description>When the user wants to apply psychological principles, mental models, or behavioral science to marketing. Also use when the user mentions &apos;psychology,&apos; &apos;mental models,&apos; &apos;cognitive bias,&apos; &apos;persuasion,&apos; &apos;behavioral science,&apos; &apos;why people buy,&apos; &apos;decision-making,&apos; &apos;consumer behavior,&apos; &apos;anchoring,&apos; &apos;social proof,&apos; &apos;scarcity,&apos; &apos;loss aversion,&apos; &apos;framing,&apos; or &apos;nudge.&apos; Use this whenever someone wants to understand or leverage how people think and make decisions in a marketing context. For applying psychology to specific pages, see cro; for pricing tactics, see pricing; for copy framing, see copywriting.</description>
<location>global</location>
</skill>

<skill>
<name>offers</name>
<description>When the user wants to design, construct, or improve an offer — the thing they actually sell — including value framing, bonus stacking, guarantee design, scarcity/urgency, naming, and payment structure. Also use when the user mentions &apos;offer,&apos; &apos;offer design,&apos; &apos;build an offer,&apos; &apos;grand slam offer,&apos; &apos;irresistible offer,&apos; &apos;value stack,&apos; &apos;bonus stack,&apos; &apos;guarantee,&apos; &apos;risk reversal,&apos; &apos;money-back guarantee,&apos; &apos;scarcity,&apos; &apos;urgency,&apos; &apos;high-ticket offer,&apos; &apos;productize a service,&apos; &apos;naming an offer,&apos; &apos;payment plan,&apos; &apos;down-sell,&apos; &apos;upsell offer,&apos; or &apos;why isn&apos;t my offer converting.&apos; Best for services, agencies, courses, coaching, info products, high-ticket B2B, and direct-response. If you run pure self-serve SaaS, read pricing first — tiers and packaging do more work there. For price level itself (tiers, freemium, value metric), see pricing. For the page that presents the offer, see copywriting. For the launch moment, see launch. For sales collateral, see sales-enablement.</description>
<location>global</location>
</skill>

<skill>
<name>onboarding</name>
<description>When the user wants to optimize post-signup onboarding, user activation, first-run experience, or time-to-value. Also use when the user mentions &quot;onboarding flow,&quot; &quot;activation rate,&quot; &quot;user activation,&quot; &quot;first-run experience,&quot; &quot;empty states,&quot; &quot;onboarding checklist,&quot; &quot;aha moment,&quot; &quot;new user experience,&quot; &quot;users aren&apos;t activating,&quot; &quot;nobody completes setup,&quot; &quot;low activation rate,&quot; &quot;users sign up but don&apos;t use the product,&quot; &quot;time to value,&quot; or &quot;first session experience.&quot; Use this whenever users are signing up but not sticking around. For signup/registration optimization, see signup. For ongoing email sequences, see emails.</description>
<location>global</location>
</skill>

<skill>
<name>paywalls</name>
<description>When the user wants to create or optimize in-app paywalls, upgrade screens, upsell modals, or feature gates. Also use when the user mentions &quot;paywall,&quot; &quot;upgrade screen,&quot; &quot;upgrade modal,&quot; &quot;upsell,&quot; &quot;feature gate,&quot; &quot;convert free to paid,&quot; &quot;freemium conversion,&quot; &quot;trial expiration screen,&quot; &quot;limit reached screen,&quot; &quot;plan upgrade prompt,&quot; &quot;in-app pricing,&quot; &quot;free users won&apos;t upgrade,&quot; &quot;trial to paid conversion,&quot; or &quot;how do I get users to pay.&quot; Use this for any in-product moment where you&apos;re asking users to upgrade. Distinct from public pricing pages (see cro) — this focuses on in-product upgrade moments where the user has already experienced value. For pricing decisions, see pricing.</description>
<location>global</location>
</skill>

<skill>
<name>ponytail</name>
<description>Ponytail, lazy senior dev mode. Always pick the simplest solution that works.</description>
<location>global</location>
</skill>

<skill>
<name>popups</name>
<description>When the user wants to create or optimize popups, modals, overlays, slide-ins, or banners for conversion purposes. Also use when the user mentions &quot;exit intent,&quot; &quot;popup conversions,&quot; &quot;modal optimization,&quot; &quot;lead capture popup,&quot; &quot;email popup,&quot; &quot;announcement banner,&quot; &quot;overlay,&quot; &quot;collect emails with a popup,&quot; &quot;exit popup,&quot; &quot;scroll trigger,&quot; &quot;sticky bar,&quot; or &quot;notification bar.&quot; Use this for any overlay or interrupt-style conversion element. For forms outside of popups, see cro. For general page conversion optimization, see cro.</description>
<location>global</location>
</skill>

<skill>
<name>pricing</name>
<description>When the user wants help with pricing decisions, packaging, or monetization strategy. Also use when the user mentions &apos;pricing,&apos; &apos;pricing tiers,&apos; &apos;freemium,&apos; &apos;free trial,&apos; &apos;packaging,&apos; &apos;price increase,&apos; &apos;value metric,&apos; &apos;Van Westendorp,&apos; &apos;willingness to pay,&apos; &apos;monetization,&apos; &apos;how much should I charge,&apos; &apos;my pricing is wrong,&apos; &apos;pricing page,&apos; &apos;annual vs monthly,&apos; &apos;per seat pricing,&apos; &apos;should I offer a free plan,&apos; &apos;pricing page teardown,&apos; &apos;pricing page audit,&apos; &apos;is my pricing page AI-readable,&apos; or &apos;can AI read my pricing.&apos; Use this whenever someone is figuring out what to charge, how to structure their plans, or wants to audit a pricing page (for humans and for the AI agents that shortlist tools). For in-app upgrade screens, see paywalls. For offer construction (bonuses, guarantees, value framing, naming) on services/courses/coaching/high-ticket B2B, see offers.</description>
<location>global</location>
</skill>

<skill>
<name>principal-fullstack-completion-qa</name>
<description>Brings an existing full-stack project to a tested, documented, production-ready state. Discovers architecture, audits frontend/backend/DB contracts, runs builds and tests, fixes systematically, updates PROJECT_STATUS.md, and never claims success without verification. Use when finishing, stabilizing, completing, hardening, QA-ing, productionizing, or shipping any existing full-stack repo (web, API, mobile-backend, monorepo); or when the user invokes Principal Full-Stack Project Completion &amp; QA / principal-fullstack-completion-qa.</description>
<location>global</location>
</skill>

<skill>
<name>principal-fullstack-workflow</name>
<description>Principal full-stack operating mode for any repo: finish-goal persistence, graphify/code evidence first, Archify for validated architecture diagrams, principal QA gates, no fake success. Use when the user wants principal full-stack work, architecture diagrams, shop-day/money-path maps, system completion, or invokes /finish-goal with Archify.</description>
<location>global</location>
</skill>

<skill>
<name>principal-md-analyst</name>
<description>Use this skill to comprehensively analyze all markdown (.md) documentation files across the project workspace from the perspective of a Principal Full Stack Engineer.</description>
<location>global</location>
</skill>

<skill>
<name>product-marketing</name>
<description>When the user wants to create or update their product marketing context document. Also use when the user mentions &apos;product context,&apos; &apos;marketing context,&apos; &apos;set up context,&apos; &apos;positioning,&apos; &apos;who is my target audience,&apos; &apos;describe my product,&apos; &apos;ICP,&apos; &apos;ideal customer profile,&apos; or wants to avoid repeating foundational information across marketing tasks. Use this at the start of any new project before using other marketing skills — it creates `.agents/product-marketing.md` that all other skills reference for product, audience, and positioning context.</description>
<location>global</location>
</skill>

<skill>
<name>programmatic-seo</name>
<description>When the user wants to create SEO-driven pages at scale using templates and data. Also use when the user mentions &quot;programmatic SEO,&quot; &quot;template pages,&quot; &quot;pages at scale,&quot; &quot;directory pages,&quot; &quot;location pages,&quot; &quot;[keyword] + [city] pages,&quot; &quot;comparison pages,&quot; &quot;integration pages,&quot; &quot;building many pages for SEO,&quot; &quot;pSEO,&quot; &quot;generate 100 pages,&quot; &quot;data-driven pages,&quot; or &quot;templated landing pages.&quot; Use this whenever someone wants to create many similar pages targeting different keywords or locations. For auditing existing SEO issues, see seo-audit. For content strategy planning, see content-strategy.</description>
<location>global</location>
</skill>

<skill>
<name>prospecting</name>
<description>When the user wants to find, qualify, and build a list of prospects to reach out to — across B2B SaaS, general B2B, or local small businesses. Also use when the user mentions &quot;prospecting,&quot; &quot;build a prospect list,&quot; &quot;find prospects,&quot; &quot;find leads,&quot; &quot;lead gen list,&quot; &quot;find SaaS companies that,&quot; &quot;find B2B companies,&quot; &quot;find local businesses,&quot; &quot;ICP-fit accounts,&quot; &quot;who should we go after,&quot; &quot;outbound list,&quot; &quot;target account list,&quot; &quot;find clients near me,&quot; &quot;businesses without websites,&quot; &quot;prospect research,&quot; &quot;qualified leads,&quot; &quot;find my first customers,&quot; &quot;early adopters,&quot; &quot;design partners,&quot; &quot;beta users,&quot; or &quot;who has this problem.&quot; Use this for the list-building and qualification phase. For writing the outbound copy after the list is built, see cold-email. For deep competitive research on specific accounts, see competitor-profiling.</description>
<location>global</location>
</skill>

<skill>
<name>public-relations</name>
<description>When the user wants help with public relations, earned media, press coverage, journalist outreach, or media strategy (not pull requests). Also use when the user mentions &apos;PR,&apos; &apos;press,&apos; &apos;press release,&apos; &apos;media outreach,&apos; &apos;pitch a journalist,&apos; &apos;get featured,&apos; &apos;media list,&apos; &apos;media kit,&apos; &apos;press kit,&apos; &apos;newsjacking,&apos; &apos;news hijack,&apos; &apos;HARO,&apos; &apos;Qwoted,&apos; &apos;Featured,&apos; &apos;reporter request,&apos; &apos;tech press,&apos; &apos;TechCrunch,&apos; &apos;thought leadership placement,&apos; &apos;op-ed,&apos; &apos;guest article,&apos; &apos;press contacts,&apos; &apos;podcast prep,&apos; &apos;podcast guest,&apos; &apos;prep me for this podcast,&apos; &apos;how do I get press,&apos; &apos;PR crisis,&apos; &apos;crisis communications,&apos; &apos;respond to backlash,&apos; &apos;we got hacked,&apos; &apos;data breach statement,&apos; or &apos;holding statement.&apos; Also covers crisis response when something goes wrong. For startup/SaaS/AI directory submissions, see directory-submissions. For product launches, see launch. For social-media engagement, see social. For cold-email outreach to prospects, see cold-email.</description>
<location>global</location>
</skill>

<skill>
<name>referrals</name>
<description>When the user wants to create, optimize, or analyze a referral program, affiliate program, or word-of-mouth strategy. Also use when the user mentions &apos;referral,&apos; &apos;affiliate,&apos; &apos;ambassador,&apos; &apos;word of mouth,&apos; &apos;viral loop,&apos; &apos;refer a friend,&apos; &apos;partner program,&apos; &apos;referral incentive,&apos; &apos;how to get referrals,&apos; &apos;customers referring customers,&apos; or &apos;affiliate payout.&apos; Use this whenever someone wants existing users or partners to bring in new customers. For launch-specific virality, see launch.</description>
<location>global</location>
</skill>

<skill>
<name>responsive-design</name>
<description>Implement modern responsive layouts using container queries, fluid typography, CSS Grid, and mobile-first breakpoint strategies. Use when building adaptive interfaces, implementing fluid layouts, or creating component-level responsive behavior.</description>
<location>global</location>
</skill>

<skill>
<name>responsive-validation</name>
<description>Validate layouts across 8 device viewports (375px–1920px): layout, touch targets, typography, content parity, orientation, overflow. Use after responsive redesigns, CSS refactors, mobile launches.</description>
<location>global</location>
</skill>

<skill>
<name>revops</name>
<description>When the user wants help with revenue operations, lead lifecycle management, or marketing-to-sales handoff processes. Also use when the user mentions &apos;RevOps,&apos; &apos;revenue operations,&apos; &apos;lead scoring,&apos; &apos;lead routing,&apos; &apos;MQL,&apos; &apos;SQL,&apos; &apos;pipeline stages,&apos; &apos;deal desk,&apos; &apos;CRM automation,&apos; &apos;marketing-to-sales handoff,&apos; &apos;data hygiene,&apos; &apos;leads aren&apos;t getting to sales,&apos; &apos;pipeline management,&apos; &apos;lead qualification,&apos; or &apos;when should marketing hand off to sales.&apos; Use this for anything involving the systems and processes that connect marketing to revenue. For cold outreach emails, see cold-email. For email drip campaigns, see emails. For pricing decisions, see pricing.</description>
<location>global</location>
</skill>

<skill>
<name>sales-enablement</name>
<description>When the user wants to create sales collateral, pitch decks, one-pagers, objection handling docs, or demo scripts. Also use when the user mentions &apos;sales deck,&apos; &apos;pitch deck,&apos; &apos;one-pager,&apos; &apos;leave-behind,&apos; &apos;objection handling,&apos; &apos;deal-specific ROI analysis,&apos; &apos;demo script,&apos; &apos;talk track,&apos; &apos;sales playbook,&apos; &apos;proposal template,&apos; &apos;buyer persona card,&apos; &apos;battle card,&apos; &apos;battlecard,&apos; &apos;competitive one-pager,&apos; &apos;win-loss analysis,&apos; &apos;why are we losing deals,&apos; &apos;loss reasons,&apos; &apos;how do I respond to this objection,&apos; &apos;prospect just said,&apos; &apos;help my sales team,&apos; &apos;sales materials,&apos; or &apos;what should I give my sales reps.&apos; Use this for any document or asset that helps a sales team close deals. For public competitor comparison pages, see competitors. For running buyer interviews or churn research, see customer-research. For marketing website copy, see copywriting. For cold outreach emails, see cold-email. For the offer being sold (bonuses, guarantees, pricing structure), see offers.</description>
<location>global</location>
</skill>

<skill>
<name>schema</name>
<description>When the user wants to add, fix, or optimize schema markup and structured data on their site. Also use when the user mentions &quot;schema markup,&quot; &quot;structured data,&quot; &quot;JSON-LD,&quot; &quot;rich snippets,&quot; &quot;schema.org,&quot; &quot;FAQ schema,&quot; &quot;product schema,&quot; &quot;review schema,&quot; &quot;breadcrumb schema,&quot; &quot;Google rich results,&quot; &quot;knowledge panel,&quot; &quot;star ratings in search,&quot; or &quot;add structured data.&quot; Use this whenever someone wants their pages to show enhanced results in Google. For broader SEO issues, see seo-audit. For AI search optimization, see ai-seo.</description>
<location>global</location>
</skill>

<skill>
<name>seo</name>
<description>Comprehensive SEO analysis for any website or business type. Full site audits, single-page analysis, technical SEO (crawlability, indexability, Core Web Vitals with INP), schema markup, content quality (E-E-A-T), image optimization, sitemap analysis, and GEO for AI Overviews/ChatGPT/Perplexity. Industry detection for SaaS, e-commerce, local, publishers, agencies. Triggers on: SEO, audit, schema, Core Web Vitals, sitemap, E-E-A-T, AI Overviews, GEO, technical SEO, content quality, page speed. Use this hub only when the SEO domain is clear and the requested workflow is not; otherwise use the exact retained leaf or command.</description>
<location>global</location>
</skill>

<skill>
<name>seo-agentic</name>
<description>Audit and fix agent readiness: the Lighthouse Agentic Browsing fraction, accessibility tree for agents, robots.txt and Content-Signal for AI agents, WAF treatment of agent traffic, llms.txt, Markdown delivery, ai-catalog.json, /.well-known discovery files, and WebMCP tools. Exclude AI citability and brand signals (seo-geo) and commerce protocol depth (seo-ecommerce).
</description>
<location>global</location>
</skill>

<skill>
<name>seo-ahrefs</name>
<description>No description available</description>
<location>global</location>
</skill>

<skill>
<name>seo-audit</name>
<description>Run a full-site SEO audit and return a scored, prioritized report. Use only for site-wide checks; use seo-page for one URL or seo-technical for a technical-only review.</description>
<location>global</location>
</skill>

<skill>
<name>seo-backlinks</name>
<description>Analyze a site&apos;s backlink profile, anchors, toxic signals, competitors, gaps, and disavow candidates. Use only when links or referring domains are the requested focus.</description>
<location>global</location>
</skill>

<skill>
<name>seo-bing</name>
<description>No description available</description>
<location>global</location>
</skill>

<skill>
<name>seo-cluster</name>
<description>Cluster keywords by SERP overlap and design hub-and-spoke content architecture with internal links. Use for planning only; use the blog-cluster command to execute article production.
</description>
<location>global</location>
</skill>

<skill>
<name>seo-competitor-pages</name>
<description>Generate SEO-optimized competitor comparison and alternatives pages. Covers &quot;X vs Y&quot; layouts, &quot;alternatives to X&quot; pages, feature matrices, schema markup, and conversion optimization. Use when user says &quot;comparison page&quot;, &quot;vs page&quot;, &quot;alternatives page&quot;, &quot;competitor comparison&quot;, &quot;X vs Y&quot;, &quot;versus&quot;, &quot;compare competitors&quot;, or &quot;alternative to&quot;.
</description>
<location>global</location>
</skill>

<skill>
<name>seo-content</name>
<description>Evaluate page content for usefulness, E-E-A-T, readability, thinness, and AI citation readiness, plus last-mile draft cleanup (AI-typical phrasing and invisible Unicode watermark characters). Use for content-only analysis, not full-page technical checks.
</description>
<location>global</location>
</skill>

<skill>
<name>seo-content-brief</name>
<description>Generate competitive SEO content briefs with per-section word counts, competitor scoring, keyword density guidance, and page-type templates. Supports both new page briefs and improve-existing-page briefs. Use when user says &quot;content brief&quot;, &quot;write a brief&quot;, &quot;content outline&quot;, &quot;blog brief&quot;, &quot;service page brief&quot;, &quot;brief for&quot;, &quot;writing brief&quot;, &quot;content plan&quot;, or &quot;outline for&quot;.
</description>
<location>global</location>
</skill>

<skill>
<name>seo-dataforseo</name>
<description>Live SEO data via DataForSEO MCP server: SERP analysis, keyword research (volume, difficulty, intent, trends), backlink profiles, on-page analysis, competitor and content analysis, business listings, AI visibility (LLM mention tracking), and domain analytics. Requires DataForSEO extension installed. Use when user says &quot;dataforseo&quot;, &quot;live SERP&quot;, &quot;keyword volume&quot;, &quot;backlink data&quot;, &quot;AI visibility check&quot;, or &quot;real search data&quot;.
</description>
<location>global</location>
</skill>

<skill>
<name>seo-drift</name>
<description>SEO drift monitoring: capture baselines of SEO-critical elements, detect changes, and track regressions over time. Git for SEO: baseline, diff, and track changes to your on-page SEO. Use when user says &quot;SEO drift&quot;, &quot;baseline&quot;, &quot;track changes&quot;, &quot;did anything break&quot;, &quot;SEO regression&quot;, &quot;compare SEO&quot;, &quot;before and after&quot;, &quot;monitor SEO changes&quot;, or &quot;deployment check&quot;.
</description>
<location>global</location>
</skill>

<skill>
<name>seo-ecommerce</name>
<description>Analyze ecommerce SEO across product pages, product schema, Shopping visibility, marketplace signals, and keyword gaps. Use only for stores, catalogs, or product listings.
</description>
<location>global</location>
</skill>

<skill>
<name>seo-firecrawl</name>
<description>Full-site crawling, scraping, and site mapping via Firecrawl MCP. Use when user says &quot;crawl site&quot;, &quot;map site&quot;, &quot;full crawl&quot;, &quot;find all pages&quot;, &quot;broken links&quot;, &quot;site structure&quot;, &quot;discover pages&quot;, &quot;JS rendering&quot;, or needs site-wide analysis.
</description>
<location>global</location>
</skill>

<skill>
<name>seo-flow</name>
<description>FLOW framework integration: evidence-led SEO using the Find → Leverage → Optimize → Win loop. Surfaces stage-specific AI prompts from the FLOW knowledge base (41 prompts, CC BY 4.0). Use when user says &quot;FLOW&quot;, &quot;FLOW framework&quot;, &quot;seo flow&quot;, &quot;evidence-led SEO&quot;, &quot;find leverage optimize win&quot;, or wants stage-specific SEO prompts.
</description>
<location>global</location>
</skill>

<skill>
<name>seo-geo</name>
<description>Audit and improve content for AI Overviews and answer engines, including citability, entity clarity, crawler access, brand signals, and passage structure.
</description>
<location>global</location>
</skill>

<skill>
<name>seo-google</name>
<description>Google SEO APIs: Search Console (Search Analytics, URL Inspection, Sitemaps), PageSpeed Insights v5, CrUX field data with 25-week history, Indexing API v3, and GA4 organic traffic. Provides real Google field data for Core Web Vitals, indexation status, search performance, and organic traffic trends. Use when user says &quot;search console&quot;, &quot;GSC&quot;, &quot;PageSpeed&quot;, &quot;CrUX&quot;, &quot;field data&quot;, &quot;indexing API&quot;, &quot;GA4 organic&quot;, &quot;URL inspection&quot;, or &quot;real CWV data&quot;.
</description>
<location>global</location>
</skill>

<skill>
<name>seo-hreflang</name>
<description>Hreflang and international SEO audit, validation, and generation. Detects common mistakes, validates language/region codes, and generates correct hreflang implementations. Use when user says &quot;hreflang&quot;, &quot;i18n SEO&quot;, &quot;international SEO&quot;, &quot;multi-language&quot;, &quot;multi-region&quot;, or &quot;language tags&quot;.
</description>
<location>global</location>
</skill>

<skill>
<name>seo-image-gen</name>
<description>AI image generation for SEO assets: OG/social preview images, blog hero images, schema images, product photography, infographics. Powered by Gemini via nanobanana-mcp. Requires banana extension installed. Use when user says &quot;generate image&quot;, &quot;OG image&quot;, &quot;social preview&quot;, &quot;hero image&quot;, &quot;blog image&quot;, &quot;product photo&quot;, &quot;infographic&quot;, &quot;seo image&quot;, &quot;create visual&quot;, &quot;image-gen&quot;, &quot;favicon&quot;, &quot;schema image&quot;, &quot;pinterest pin&quot;, &quot;generate visual&quot;, &quot;banner&quot;, or &quot;thumbnail&quot;.</description>
<location>global</location>
</skill>

<skill>
<name>seo-images</name>
<description>Image optimization analysis for SEO and performance. Checks alt text, file sizes, formats, responsive images, lazy loading, CLS prevention, image SERP rankings (via DataForSEO), and image file optimization (WebP/AVIF conversion, IPTC/XMP metadata injection). Use when user says &quot;image optimization&quot;, &quot;alt text&quot;, &quot;image SEO&quot;, &quot;image size&quot;, &quot;image audit&quot;, &quot;optimize images&quot;, &quot;image metadata&quot;, &quot;image SERP&quot;, &quot;convert to webp&quot;, or &quot;image file optimize&quot;.
</description>
<location>global</location>
</skill>

<skill>
<name>seo-local</name>
<description>Audit local SEO, including Google Business Profile, NAP consistency, citations, reviews, local schema, location pages, and multi-location structure.
</description>
<location>global</location>
</skill>

<skill>
<name>seo-maps</name>
<description>Maps intelligence for local SEO: geo-grid rank tracking, GBP profile auditing via API, review intelligence across Google/Tripadvisor/Trustpilot, cross-platform NAP verification, competitor radius mapping, and LocalBusiness schema generation. Three tiers: free (Overpass + Geoapify), DataForSEO, and DataForSEO + Google. Use when user says &quot;maps&quot;, &quot;geo-grid&quot;, &quot;rank tracking&quot;, &quot;GBP audit&quot;, &quot;review velocity&quot;, &quot;competitor radius&quot;, or &quot;SoLV&quot;.
</description>
<location>global</location>
</skill>

<skill>
<name>seo-matomo</name>
<description>No description available</description>
<location>global</location>
</skill>

<skill>
<name>seo-page</name>
<description>Analyze one supplied URL across on-page, content, technical metadata, schema, images, and performance. Use only for a single-page review.
</description>
<location>global</location>
</skill>

<skill>
<name>seo-plan</name>
<description>Strategic SEO planning for new or existing websites. Industry-specific templates, competitive analysis, content strategy, and implementation roadmap. Use when user says &quot;SEO plan&quot;, &quot;SEO strategy&quot;, &quot;SEO planning&quot;, &quot;content strategy&quot;, &quot;keyword strategy&quot;, &quot;content calendar&quot;, &quot;site architecture&quot;, or &quot;SEO roadmap&quot;.
</description>
<location>global</location>
</skill>

<skill>
<name>seo-profound</name>
<description>No description available</description>
<location>global</location>
</skill>

<skill>
<name>seo-programmatic</name>
<description>Programmatic SEO planning and analysis for pages generated at scale from data sources. Covers template engines, URL patterns, internal linking automation, thin content safeguards, and index bloat prevention. Use when user says &quot;programmatic SEO&quot;, &quot;pages at scale&quot;, &quot;dynamic pages&quot;, &quot;template pages&quot;, &quot;generated pages&quot;, or &quot;data-driven SEO&quot;.
</description>
<location>global</location>
</skill>

<skill>
<name>seo-schema</name>
<description>Detect, validate, or generate Schema.org JSON-LD for a supplied page or entity. Use only when structured data or rich-result markup is requested.
</description>
<location>global</location>
</skill>

<skill>
<name>seo-seranking</name>
<description>No description available</description>
<location>global</location>
</skill>

<skill>
<name>seo-sitemap</name>
<description>Analyze existing XML sitemaps or generate new ones with industry templates. Validates format, URLs, and structure. Use when user says &quot;sitemap&quot;, &quot;generate sitemap&quot;, &quot;sitemap issues&quot;, or &quot;XML sitemap&quot;.
</description>
<location>global</location>
</skill>

<skill>
<name>seo-sxo</name>
<description>Diagnose search-experience and intent mismatches using SERP page types, user stories, and persona scoring. Use when ranking problems appear intent- or layout-driven.
</description>
<location>global</location>
</skill>

<skill>
<name>seo-technical</name>
<description>Audit technical SEO across crawlability, indexability, security, URLs, mobile, Core Web Vitals, rendering, structured data, and IndexNow. Exclude content strategy and backlinks.
</description>
<location>global</location>
</skill>

<skill>
<name>seo-unlighthouse</name>
<description>No description available</description>
<location>global</location>
</skill>

<skill>
<name>signup</name>
<description>When the user wants to optimize signup, registration, account creation, or trial activation flows. Also use when the user mentions &quot;signup conversions,&quot; &quot;registration friction,&quot; &quot;signup form optimization,&quot; &quot;free trial signup,&quot; &quot;reduce signup dropoff,&quot; &quot;account creation flow,&quot; &quot;people aren&apos;t signing up,&quot; &quot;signup abandonment,&quot; &quot;trial conversion rate,&quot; &quot;nobody completes registration,&quot; &quot;too many steps to sign up,&quot; or &quot;simplify our signup.&quot; Use this whenever the user has a signup or registration flow that isn&apos;t performing. For post-signup onboarding, see onboarding. For lead capture forms (not account creation), see cro.</description>
<location>global</location>
</skill>

<skill>
<name>site-architecture</name>
<description>When the user wants to plan, map, or restructure their website&apos;s page hierarchy, navigation, URL structure, or internal linking. Also use when the user mentions &quot;sitemap,&quot; &quot;site map,&quot; &quot;visual sitemap,&quot; &quot;site structure,&quot; &quot;page hierarchy,&quot; &quot;information architecture,&quot; &quot;IA,&quot; &quot;navigation design,&quot; &quot;URL structure,&quot; &quot;breadcrumbs,&quot; &quot;internal linking strategy,&quot; &quot;website planning,&quot; &quot;what pages do I need,&quot; &quot;how should I organize my site,&quot; or &quot;site navigation.&quot; Use this whenever someone is planning what pages a website should have and how they connect. NOT for XML sitemaps (that&apos;s technical SEO — see seo-audit). For SEO audits, see seo-audit. For structured data, see schema.</description>
<location>global</location>
</skill>

<skill>
<name>slides</name>
<description>Create strategic HTML presentations with Chart.js, design tokens, responsive layouts, copywriting formulas, and contextual slide strategies.</description>
<location>global</location>
</skill>

<skill>
<name>sms</name>
<description>When the user wants to plan, build, or optimize SMS, MMS, or WhatsApp marketing — including welcome flows, abandoned cart texts, post-purchase, win-back, promotional sends, or transactional/auth SMS. Also use when the user mentions &quot;SMS marketing,&quot; &quot;text message campaigns,&quot; &quot;SMS sequence,&quot; &quot;SMS automation,&quot; &quot;abandoned cart text,&quot; &quot;post-purchase SMS,&quot; &quot;Klaviyo SMS,&quot; &quot;Postscript,&quot; &quot;Attentive,&quot; &quot;Twilio,&quot; &quot;A2P 10DLC,&quot; &quot;TCPA,&quot; &quot;SMS compliance,&quot; &quot;short code,&quot; &quot;toll-free SMS,&quot; &quot;MMS campaign,&quot; &quot;should I do SMS,&quot; &quot;SMS vs email,&quot; &quot;WhatsApp marketing,&quot; &quot;WhatsApp Business API,&quot; &quot;WhatsApp templates,&quot; or &quot;click-to-WhatsApp.&quot; For email sequences, see emails. For SMS copy framing, see copywriting. For opt-in popups that capture phone numbers, see popups.</description>
<location>global</location>
</skill>

<skill>
<name>social</name>
<description>When the user wants help creating, scheduling, or optimizing social media content for LinkedIn, Twitter/X, Instagram, TikTok, or Facebook, or wants to do social listening and engagement triage. Also use when the user mentions &apos;LinkedIn post,&apos; &apos;Twitter thread,&apos; &apos;social media,&apos; &apos;content calendar,&apos; &apos;social scheduling,&apos; &apos;engagement,&apos; &apos;viral content,&apos; &apos;what should I post,&apos; &apos;repurpose this content,&apos; &apos;tweet ideas,&apos; &apos;LinkedIn carousel,&apos; &apos;social media strategy,&apos; &apos;grow my following,&apos; &apos;TikTok video,&apos; &apos;Reels,&apos; &apos;Shorts,&apos; &apos;video script,&apos; &apos;video hook,&apos; &apos;short-form video,&apos; &apos;create a reel,&apos; &apos;social listening,&apos; &apos;brand mentions,&apos; &apos;competitor monitoring,&apos; &apos;top posts to comment on,&apos; &apos;find people asking for,&apos; &apos;carousel,&apos; &apos;slide-by-slide,&apos; or &apos;document post.&apos; Use this for social content, repurposing, scheduling, video scripts, and listening. Posts avoid AI tells like &apos;it&apos;s not X, it&apos;s Y&apos; reveals and broetry. For broader content strategy, see content-strategy. For paid ads, see ad-creative. For earned media, see public-relations.</description>
<location>global</location>
</skill>

<skill>
<name>ui-designer</name>
<description>Designs visual interfaces, component structure, interaction, and accessibility for user-facing UI. Use when designing screens, refining ops/customer chrome, or specifying component states. Invoke as ui-designer.</description>
<location>global</location>
</skill>

<skill>
<name>ui-styling</name>
<description>Create beautiful, accessible user interfaces with shadcn/ui components (built on Radix UI + Tailwind), Tailwind CSS utility-first styling, and canvas-based visual designs. Use when building user interfaces, implementing design systems, creating responsive layouts, adding accessible components (dialogs, dropdowns, forms, tables), customizing themes and colors, implementing dark mode, generating visual designs and posters, or establishing consistent styling patterns across applications.</description>
<location>global</location>
</skill>

<skill>
<name>ui-ux-pro-max</name>
<description>UI/UX design intelligence for web, mobile, and desktop. This skill should be used when designing, building, reviewing, or fixing interfaces, including pages, components, design systems, accessibility, interaction, responsive layout, typography, color, charts, and stack-specific UI implementation. Searchable local data: 79 searchable styles (50 active), 192 product palettes and reasoning profiles, 74 font pairings, 119 UX guidelines, 105 icons, 17 GSAP presets, 25 chart types, and 22 stacks.</description>
<location>global</location>
</skill>

<skill>
<name>video</name>
<description>When the user wants to create, generate, or produce video content using AI tools or programmatic frameworks. Also use when the user mentions &apos;video production,&apos; &apos;AI video,&apos; &apos;Remotion,&apos; &apos;Hyperframes,&apos; &apos;HeyGen,&apos; &apos;Synthesia,&apos; &apos;Veo,&apos; &apos;Sora,&apos; &apos;Runway,&apos; &apos;Kling,&apos; &apos;Seedance,&apos; &apos;Hailuo,&apos; &apos;MiniMax,&apos; &apos;Pika,&apos; &apos;Hunyuan,&apos; &apos;Wan,&apos; &apos;video generation,&apos; &apos;AI avatar,&apos; &apos;talking head video,&apos; &apos;programmatic video,&apos; &apos;video template,&apos; &apos;explainer video,&apos; &apos;product demo video,&apos; &apos;record a product demo,&apos; &apos;feature demo video,&apos; &apos;in-app demo,&apos; &apos;video pipeline,&apos; &apos;copy this edit,&apos; &apos;match this video style,&apos; &apos;reverse-engineer this video,&apos; &apos;edit like this reference,&apos; or &apos;make me a video.&apos; Use this for video creation, generation, and production workflows. For video content strategy and what to post, see social. For paid video ad creative, see ad-creative.</description>
<location>global</location>
</skill>

</available_skills>
<!-- SKILLS_TABLE_END -->

</skills_system>