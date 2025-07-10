## **STEP 1 OF 6: Foundation & Design System**

```xml
<system>
You are an expert web app developer specializing in glassmorphic design following Apple's Human Interface Guidelines. You create mobile-ready applications with clean, professional interfaces.
</system>

<user>
Create "AI Public Policy Frame the Debate Expert" app foundation. This is STEP 1 of 6 - focus on design system.

<app_vision>
• Generate strategically framed AI policy content
• Target: policymakers, advocates, researchers, public
• Output: blog posts, articles, marketing playbooks, social calendars
</app_vision>

<glassmorphic_design>
Apply throughout:
• backdrop-filter: blur(20px) with subtle transparency
• Border radius: 16px cards, 12px buttons
• Professional blue-to-light-blue gradient palette
• Soft shadows: 0 8px 32px rgba(0, 0, 0, 0.1)
• Touch-friendly: minimum 44px targets
</glassmorphic_design>

<app_structure>
Main screens:
1. Landing - App intro and primary inputs
2. Generation Dashboard - Main interface
3. Output Display - Generated content
4. Settings - User preferences & API configuration
5. Content Library - Saved content

Core inputs:
• "Enter a Topic" field
• "Enter a Topic and URL" field
• Geographic selector (USA, Europe, Australia, Morocco)
• Four content type cards
</app_structure>

<output_requirements>
Create glassmorphic CSS foundation, responsive layout system, component library, and main screen layouts with proper mobile optimization.
</output_requirements>
</user>
```

---

## **STEP 2 OF 6: Gemini LLM API Integration**

```xml
<system>
Continue AI Policy app development. This is STEP 2 of 6. You have the foundation from Step 1. Now focus on perfect Google Gemini LLM API integration.
</system>

<user>
Implement secure Google Gemini API integration using established glassmorphic design.

<gemini_models> ONLY USE THESE MODELS!!!
Support only these Gemini models with selection interface:
• gemini-2.5-pro: Most capable, complex reasoning
• gemini-2.5-flash: Fast responses, efficient processing
• gemma-3-12b-it: Lightweight, cost-effective option

Display model capabilities, speed, and cost comparison in glass cards.
</gemini_models>

<api_configuration>
Settings screen implementation:
• Secure API key input field with encryption
• API key validation and connection testing
• Model selection dropdown with descriptions
• Usage quota monitoring and alerts
• Rate limiting and error handling
• API key storage using secure browser storage
</api_configuration>

<security_measures>
• Never store API keys in plain text
• Use browser's secure storage (localStorage encrypted)
• Implement API key masking in UI (show only last 4 chars)
• Secure transmission using HTTPS only
• API key rotation support and warnings
• Clear API keys on logout/uninstall
</security_measures>

<api_integration>
• Dynamic model switching without app restart
• Optimized prompts for each Gemini model
• Response streaming for real-time updates
• Token counting and usage tracking
• Error handling with user-friendly messages
• Fallback model selection on failures
</api_integration>

<output_requirements>
Create secure API configuration interface, model selection system, usage monitoring, and robust error handling with glassmorphic design consistency.
</output_requirements>
</user>
```

---

## **STEP 3 OF 6: Content Generation Engine**

```xml
<system>
Continue AI Policy app development. This is STEP 3 of 6. You have foundation and API integration. Now focus on content generation engine optimized for Gemini models.
</system>

<user>
Implement content generation system using Gemini API integration.

<content_types>
Four glass card options:
1. "Short Daily Blog Post" - 200-300 words, thought-provoking
2. "Engaging Article" - 800-1200 words, storytelling focus
3. "Marketing Playbook" - Comprehensive strategy document
4. "Social Media Calendar" - One-month daily suggestions
</content_types>

<gemini_optimization>
Model-specific prompt engineering:
• gemini-2.5-pro: Complex reasoning, nuanced framing
• gemini-2.5-flash: Quick generation, efficient prompts
• gemma-3-12b-it: Simplified prompts, clear instructions
• Dynamic context window management
• Temperature and top-p optimization per model
</gemini_optimization>

<processing_workflow>
1. Input validation and topic analysis
2. Geographic context application
3. Information gathering (search/scrape)
4. Gemini model selection based on content type
5. Optimized prompt generation
6. Content creation with streaming responses
7. Quality review and optimization
8. Final output presentation
</processing_workflow>

<search_system>
• Targeted search API for AI policy content
• Web scraping for provided URLs
• Regional policy database integration
• Real-time information validation
• Content preprocessing for Gemini context
</search_system>

<output_requirements>
Create content generation interface optimized for Gemini models, streaming responses, and processing workflow with progress indicators using glassmorphic design.
</output_requirements>
</user>
```

---

## **STEP 4 OF 6: Marketing Philosophy Integration**

```xml
<system>
Continue AI Policy app development. This is STEP 4 of 6. You have foundation, API integration, and content engine. Now integrate marketing philosophy frameworks.
</system>

<user>
Implement marketing philosophy integration using established system.

<lakoff_framing>
George Lakoff's Cognitive Framing:
• Analyze topics for conceptual metaphors
• Reframe with positive, value-based language
• Transform "AI dangers" to "AI serving humanity"
• Avoid negative frames reinforcing opposition
• Gemini-optimized framing prompts
</lakoff_framing>

<godin_marketing>
Seth Godin's Permission Marketing:
• Generate remarkable, shareable content
• Build trust before asking for engagement
• Create lead magnets (reports, interviews)
• Brand story: Setting, Challenge, Obstacles, Transformation
• Permission-based email sequences
</godin_marketing>

<vaynerchuk_content>
Gary Vaynerchuk's Authentic Creation:
• Authentic, transparent, relatable content
• Avoid corporate jargon
• "Document, don't create" philosophy
• Multi-platform optimization
• Behind-the-scenes content suggestions
</vaynerchuk_content>

<flanagan_acquisition>
Kieran Flanagan's User Acquisition:
• Counter-intuitive traffic tactics
• A/B testing framework for messages
• Plan for 1000 users in 3 months
• Conversion rate optimization
• Growth hacking techniques
</flanagan_acquisition>

<integration>
• Combine all four philosophies cohesively
• Dynamic framework selection by content type
• Gemini model optimization for each philosophy
• Real-time optimization using principles
</integration>

<output_requirements>
Create framework integration engine, customization interface, and philosophy-specific Gemini prompts with glassmorphic design.
</output_requirements>
</user>
```

---

## **STEP 5 OF 6: Convex File Reference Integration**

```xml
<system>
Continue AI Policy app development. This is STEP 5 of 6. You have foundation, API integration, content engine, and frameworks. Now integrate Convex file reference system.
</system>

<user>
Implement Convex file reference system for enhanced George Lakoff framing using established glassmorphic design.

<convex_file_awareness>
• Connect to existing Convex file storage
• Access uploaded documents (PDFs, DOCs, TXTs) already in database
• Retrieve file metadata and text content
• No user file upload interface needed
• Files are pre-existing in Convex system
</convex_file_awareness>

<lakoff_enhancement>
George Lakoff Frame Enhancement with Convex Files:
• Search existing files for relevant framing examples
• Extract key metaphors and framing techniques from stored documents
• Reference file content in blog post and article generation
• Use document insights for cognitive framing analysis
• Cross-reference stored materials with generated content
• Auto-cite relevant documents from Convex storage
</lakoff_enhancement>

<file_integration>
• Query Convex files during content generation
• Text search across stored documents
• Extract quotes and examples from existing materials
• Knowledge base integration using stored files
• Document-based fact checking and validation
• Context-aware content enhancement using file references
</file_integration>

<search_functionality>
• Search existing Convex files by keywords and phrases
• Semantic search across document content
• Relevance scoring and ranking
• Auto-suggestions based on stored content
• Search integration with content generation workflow
</search_functionality>

<output_requirements>
Create Convex file reference system, Lakoff framing enhancement using stored documents, and search functionality with glassmorphic design consistency.
</output_requirements>
</user>
```

---

## **STEP 6 OF 6: Output Generation & User Management**

```xml
<system>
Complete AI Policy app development. This is STEP 6 of 6 (final). You have foundation, API integration, content engine, frameworks, and Convex file reference. Now implement final outputs and user management.
</system>

<user>
Implement final features using established glassmorphic design system.

<specific_outputs>
1. Blog Post: 200-300 words, moral framing, call-to-action, SEO optimization
2. Article: 800-1200 words, storytelling, multi-section, expert citations
3. Marketing Playbook: Messaging strategy, brand story, A/B testing, distribution
4. Social Calendar: Platform-specific content, engagement prediction, hashtags
</specific_outputs>

<user_system>
• Secure registration/login
• Profile customization with preferences
• API key management and security
• Content generation history
• Usage tracking and analytics
• Team collaboration features
</user_system>

<content_management>
• Save and organize generated content
• Version control for improvements
• Export options (PDF, Word, HTML, social formats)
• Performance analytics and tracking
• Archive and search functionality
• Content sharing and collaboration
</content_management>

<geographic_focus>
• USA: Federal and state AI initiatives
• Europe: GDPR, AI Act, EU framework
• Australia: AI governance, ethical principles
• Morocco: Digital transformation, AI strategy
• Real-time policy updates
• Cultural context adaptation
</geographic_focus>

<technical_architecture>
• Modern front-end with glassmorphic components
• Robust back-end with secure API handling
• Database for content, users, analytics
• Gemini API integration with security
• Convex file reference integration
• Scalable infrastructure
</technical_architecture>

<output_requirements>
Create complete system with secure API management, content generation, user authentication, Convex file integration, and technical architecture with consistent glassmorphic design.
</output_requirements>
</user>
```