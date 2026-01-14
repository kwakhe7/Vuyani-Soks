// Vuyani & Soks Security Chatbot
// Floating assistant for FAQs, quick navigation and lead conversion.
// Key parts:
// - responses: reusable message templates
// - init: binds UI and injects widget if missing
// - processMessage: routes natural text to actions/answers
(function() {
    'use strict';
    
    // Configuration
    const config = {
        businessName: 'Vuyani & Soks Security',
        phoneNumber: '+27-18-293-0177',
        email: 'info@vuyaniandsoks.co.za',
        location: '98 Peter Mokaba St, Potchefstroom, 2520',
        workingHours: '24/7 Control Room Support, Office Mon-Fri 8AM-5PM'
    };
    
    // Response mappings
    const responses = {
        'faq_training': [
            "🎓 **Training for our guards and staff:**",
            "• PSIRA-compliant induction and ethics",
            "• Site-specific SOPs and post orders",
            "• Conflict management and customer service",
            "• First Aid, fire safety and evacuation",
            "• Access control, patrols and incident reporting",
            "• CCTV monitoring and radio communications",
            "• K9 and armed response modules where applicable",
            "",
            "✅ Continuous refreshers ensure skills stay current on the job."
        ],
        'faq_emergency_training': [
            "🚨 **Emergency readiness (incl. active shooter):**",
            "• Risk awareness and threat identification",
            "• Lockdown, evacuation and shelter-in-place procedures",
            "• Communications: control room, SAPS and EMS coordination",
            "• Scene management and cordon control",
            "• Triage support and crowd movement safety",
            "• Post-incident reporting and debrief",
            "",
            "🛡️ Training follows practical, scenario-based drills for high-stress events."
        ],
        'faq_qualifications': [
            "📜 **Qualifications and certifications:**",
            "• PSIRA registration (Grades E–A) for security personnel",
            "• Firearm competency where armed response is required",
            "• First Aid (Level 1–3) and Fire Marshal certificates",
            "• CCTV/Control room operator training",
            "• K9 handler certifications where applicable",
            "• Background checks and vetting prior to deployment",
            "",
            "🔍 Certificates are verified and recorded in staff files."
        ],
        'faq_ongoing_training': [
            "♻️ **Ongoing training and professional development:**",
            "• Quarterly refreshers and toolbox talks",
            "• Site audits and performance reviews",
            "• Updated SOPs as risks evolve",
            "• New tech onboarding (access control, CCTV analytics)",
            "• Compliance updates per PSIRA and local regulations",
            "",
            "📈 We track competencies and schedule retraining proactively."
        ],
        'faq_risk_assessment': [
            "🧭 **Risk | Security Assessment:**",
            "• Structured evaluation of threats, vulnerabilities and impact",
            "• On-site survey: perimeter, access points, lighting, cameras",
            "• Operational review: procedures, staffing and incident history",
            "• Likelihood × impact matrix to prioritize risks",
            "• Clear recommendations: procedural, physical and technology controls",
            "",
            "📄 You receive a report with a phased improvement plan."
        ],
        'faq_gate_automation': [
            "⚙️ **Gate | Garage Automation (overview):**",
            "Motorized systems that open/close gates or garage doors via remotes, keypads, tags or smart integrations.",
            "Includes controller boards, motors, racks/actuators, safety beams and backup power."
        ],
        'faq_gate_automation_services': [
            "🛠️ **Gate | Garage Automation services we offer:**",
            "• New installations and upgrades",
            "• Motor replacement and repairs",
            "• Remote/keypad/tag programming",
            "• Safety beam installation and testing",
            "• Battery backup and solar options",
            "• Intercom and access control integration",
            "• Preventative maintenance"
        ],
        'faq_gate_automation_how': [
            "🔄 **How Gate | Garage Automation works:**",
            "• A motor drives a rack (sliding) or actuator (swing) to move the gate",
            "• A controller board manages open/close logic and limits",
            "• Inputs: remotes, keypads, RFID tags, intercom triggers",
            "• Safety beams stop movement if an obstacle is detected",
            "• Backup battery keeps operation during power outages"
        ],
        'faq_event_guarding': [
            "🎪 **Event Guarding:**",
            "Security for events focusing on access control, ticket verification, bag checks, crowd management and VIP/backstage protection.",
            "Pre-event risk assessment, emergency plans and post-event reporting included."
        ],
        'faq_boom_gate': [
            "⛔ **Boom Gate:**",
            "Vehicle access barrier with a horizontal arm controlled by a motor and controller.",
            "Integrates with ticketing, RFID/ANPR readers and safety beams to manage entry/exit at estates and parking sites."
        ],
        'services': [
            "🛡️ We offer comprehensive security services including:",
            "• **Residential Security** - 24/7 monitoring and patrols for your home",
            "• **Commercial Security** - Business protection and access control systems",
            "• **Event Security** - Crowd control and VIP protection for any occasion",
            "• **CCTV Monitoring** - State-of-the-art surveillance with remote monitoring",
            "• **K9 Units** - Highly trained detection and patrol services",
            "• **Armed Response** - Rapid reaction teams for immediate security breaches",
            "",
            "💡 **Quick tip:** You can also visit our Services page to see detailed information about each offering!"
        ],
        'quote': [
            "💰 **Getting a personalized quote is easy!**",
            "For the most accurate pricing, we recommend:",
            "• **Free site assessment** to understand your specific security needs",
            "• **Customized security plan** tailored to your requirements",
            "• **Transparent pricing** with no hidden fees",
            "",
            "📞 **Ready to get started?** Contact us directly at ${config.phoneNumber} or click 'Contact Us' to schedule your free consultation!"
        ],
        'contact': [
            "📞 **We're here to help 24/7!**",
            `**Phone:** ${config.phoneNumber}`,
            `**Email:** ${config.email}`,
            `**Location:** ${config.location}`,
            `**Hours:** ${config.workingHours}`,
            "",
            "🚨 **Emergency?** Our control room is always available!",
            "💬 **Prefer chat?** Keep messaging here or visit our contact page directly!"
        ],
        'hours': [
            `⏰ **We're always here when you need us:**`,
            `**24/7 Control Room Support** - Never leave a call unanswered`,
            `**Office Hours:** Monday - Friday, 8:00 AM - 5:00 PM`,
            `**Location:** ${config.location}`,
            "",
            "🌙 **After hours?** Our emergency response team is always on standby!"
        ],
        'greeting': [
            "👋 **Hello and welcome to Vuyani & Soks Security!**",
            "🛡️ **Your safety is our priority** - We provide professional security solutions tailored to your needs.",
            "",
            "💡 **How can I help you today?** You can:",
            "• Ask about our services",
            "• Request a free quote",
            "• Get our contact details",
            "• Check our working hours",
            "• Or simply type your question!"
        ],
        'help': [
            "🤔 **Here's what I can help you with:**",
            "• **Services** - Learn about all our security offerings",
            "• **Quote** - Get pricing information and schedule consultations",
            "• **Contact** - Find our phone, email, and location details",
            "• **Hours** - Check our availability and support times",
            "• **About** - Learn more about Vuyani & Soks Security",
            "",
            "💬 **Just type your question naturally!** I'll do my best to help."
        ],
        'about': [
            "🏢 **About Vuyani & Soks Security:**",
            "We're a leading provider of innovative security solutions, serving high-risk, client-focused environments since 2014.",
            "",
            "✨ **What makes us different:**",
            "• PSIRA registered and fully compliant",
            "• Highly trained, professional staff",
            "• 24/7 support and rapid response",
            "• Customized security solutions",
            "• Commitment to customer satisfaction",
            "",
            "🌟 **Ready to secure your peace of mind?** Let's discuss your security needs!"
        ],
        'jobs': [
            "💼 **Careers at Vuyani & Soks Security**",
            "We are always looking for dedicated security professionals to join our team.",
            "",
            "📝 **How to apply:**",
            "Please visit our office at **98 Peter Mokaba St, Potchefstroom** to submit your CV and relevant PSIRA documentation.",
            "",
            "📞 **Questions?** Call us at +27-18-293-0177 for more information about current vacancies."
        ],
        'default': [
            "🤔 **I want to make sure I help you properly!**",
            "Here are some quick options:",
            "• **Services** - See what security solutions we offer",
            "• **Quote** - Get personalized pricing information",
            "• **Contact** - Reach out to our team directly",
            "• **About** - Learn more about our company",
            "",
            "💡 **Or just tell me what you're looking for** - I'll point you in the right direction!"
        ],
        'thanks': [
            "😊 **You're very welcome!**",
            "It was my pleasure helping you with your security questions.",
            "",
            "🛡️ **Remember:** Your safety is our priority. Don't hesitate to reach out if you need anything else!"
        ],
        'goodbye': [
            "👋 **Goodbye and stay safe!**",
            "Thank you for chatting with Vuyani & Soks Security today.",
            "",
            "🛡️ **We're here whenever you need us** - 24/7 for all your security needs!"
        ]
    };
    
    // DOM elements
    let chatbotToggle, chatbotPanel, chatbotClose, chatbotMessages, chatbotInput, chatbotSend, chatbotMenu;
    let isFirstVisit = true;
    
    // Initialize chatbot
    function init() {
        chatbotToggle = document.getElementById('chatbot-toggle');
        chatbotPanel = document.getElementById('chatbot-panel');
        chatbotClose = document.getElementById('chatbot-close');
        chatbotMessages = document.getElementById('chatbot-messages');
        chatbotInput = document.getElementById('chatbot-input-field');
        chatbotSend = document.getElementById('chatbot-send');
        chatbotMenu = document.getElementById('chatbot-menu');
        
        if (!chatbotToggle || !chatbotPanel) {
            const widget = document.createElement('div');
            widget.id = 'chatbot-widget';
            widget.className = 'chatbot-widget';
            widget.innerHTML = `
                <button id="chatbot-toggle" class="chatbot-toggle" aria-label="Open chat">
                    <span>💬</span>
                </button>
                <div id="chatbot-panel" class="chatbot-panel">
                    <div class="chatbot-header">
                        <div class="chatbot-title">
                            <img src="IMAGES/logo.png" alt="Vuyani & Soks" class="chatbot-logo">
                            <span>Vuyani & Soks Security</span>
                        </div>
                        <button id="chatbot-close" class="chatbot-close" aria-label="Close chat">✖</button>
                    </div>
                    <div class="chatbot-messages" id="chatbot-messages"></div>
                    <div class="chatbot-menu" id="chatbot-menu"></div>
                    <div class="chatbot-input">
                        <input type="text" id="chatbot-input-field" placeholder="Type your message...">
                        <button id="chatbot-send" aria-label="Send message">➤</button>
                    </div>
                </div>
            `;
            document.body.appendChild(widget);
            chatbotToggle = document.getElementById('chatbot-toggle');
            chatbotPanel = document.getElementById('chatbot-panel');
            chatbotClose = document.getElementById('chatbot-close');
            chatbotMessages = document.getElementById('chatbot-messages');
            chatbotInput = document.getElementById('chatbot-input-field');
            chatbotSend = document.getElementById('chatbot-send');
            chatbotMenu = document.getElementById('chatbot-menu');
        }
        
        chatbotToggle.addEventListener('click', toggleChatbot);
        chatbotClose.addEventListener('click', closeChatbot);
        chatbotSend.addEventListener('click', sendMessage);
        chatbotInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
        
        if (chatbotMenu) {
            chatbotMenu.innerHTML = `
                <select id="chatbot-dropdown" class="chatbot-dropdown" aria-label="Quick actions">
                    <option value="">Quick actions…</option>
                    <option value="services">Our Services</option>
                    <option value="quote">Get a Quote</option>
                    <option value="contact">Contact Us</option>
                    <option value="hours">Working Hours</option>
                    <option value="about">About Us</option>
                </select>
            `;
            const dropdown = document.getElementById('chatbot-dropdown');
            if (dropdown) {
                dropdown.addEventListener('change', function(e) {
                    const val = e.target.value;
                    if (val) {
                        handleMenuOption(val);
                        e.target.value = '';
                    }
                });
            }
        }
        
        // Check if first visit
        if (localStorage.getItem('chatbot-visited')) {
            isFirstVisit = false;
        } else {
            localStorage.setItem('chatbot-visited', 'true');
            // Show welcome message after a short delay
            setTimeout(() => {
                if (!chatbotPanel.classList.contains('active')) {
                    showWelcomeMessage();
                }
            }, 3000);
        }
        
        console.log('Chatbot initialized successfully - chatbot.js:301');
    }
    
    // Toggle chatbot visibility
    function toggleChatbot() {
        if (chatbotPanel.classList.contains('active')) {
            closeChatbot();
        } else {
            openChatbot();
        }
    }
    
    // Open chatbot
    function openChatbot() {
        chatbotPanel.classList.add('active');
        chatbotToggle.classList.add('active');
        chatbotInput.focus();
        
        // Show welcome message if first time opening
        if (isFirstVisit && chatbotMessages.children.length === 1) {
            setTimeout(() => {
                showBotMessage(responses.greeting);
                showBotMessage(responses.help);
            }, 500);
            isFirstVisit = false;
        }
    }
    
    // Close chatbot
    function closeChatbot() {
        chatbotPanel.classList.remove('active');
        chatbotToggle.classList.remove('active');
    }
    
    // Send user message
    function sendMessage() {
        const message = chatbotInput.value.trim();
        if (message === '') return;
        
        // Show user message
        showUserMessage(message);
        
        // Process and respond
        setTimeout(() => {
            processMessage(message);
        }, 500);
        
        // Clear input
        chatbotInput.value = '';
    }
    
    // Format message with simple markdown
    function formatMessage(text) {
        // First escape HTML to prevent XSS
        let formatted = escapeHtml(text);
        
        // Convert **bold** to <strong>bold</strong>
        formatted = formatted.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        
        // Convert newlines to <br>
        formatted = formatted.replace(/\n/g, '<br>');
        
        return formatted;
    }

    // Show user message
    function showUserMessage(message) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'user-message';
        messageDiv.innerHTML = `
            <div class="message-bubble">${formatMessage(message)}</div>
        `;
        chatbotMessages.appendChild(messageDiv);
        scrollToBottom();
    }
    
    // Show typing indicator
    function showTypingIndicator() {
        const typingDiv = document.createElement('div');
        typingDiv.className = 'typing-indicator';
        typingDiv.id = 'typing-indicator';
        typingDiv.innerHTML = `
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
        `;
        chatbotMessages.appendChild(typingDiv);
        scrollToBottom();
    }

    // Remove typing indicator
    function removeTypingIndicator() {
        const typingDiv = document.getElementById('typing-indicator');
        if (typingDiv) {
            typingDiv.remove();
        }
    }

    // Helper to append message to DOM
    function appendBotMessage(text) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'bot-message';
        messageDiv.innerHTML = `
            <div class="message-bubble">${formatMessage(text)}</div>
        `;
        chatbotMessages.appendChild(messageDiv);
        scrollToBottom();
    }

    // Show bot message (can be string or array)
    function showBotMessage(message) {
        // Define typing duration (random between 600ms and 1000ms)
        const typingTime = 600 + Math.random() * 400;
        
        showTypingIndicator();
        
        setTimeout(() => {
            removeTypingIndicator();
            
            if (Array.isArray(message)) {
                // Handle first message
                const firstMsg = message[0];
                appendBotMessage(firstMsg);
                
                // Handle remaining messages recursively
                if (message.length > 1) {
                    setTimeout(() => {
                        showBotMessage(message.slice(1));
                    }, 400);
                }
            } else {
                appendBotMessage(message);
            }
        }, typingTime);
    }
    
    // Process user message
    function processMessage(message) {
        try {
            const lowerMessage = message.toLowerCase();
            
            // Check for page-specific redirections first
            if (lowerMessage.includes('vuyani') || lowerMessage.includes('about') || lowerMessage.includes('who') || lowerMessage.includes('company')) {
                showBotMessage(["🤔 I'll take you to our About page where you can learn more about Vuyani & Soks Security!", "📍 Redirecting you now..."]);
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 4000);
            } else if (
                (lowerMessage.includes('active shooter')) ||
                ((lowerMessage.includes('emergency') || lowerMessage.includes('critical')) &&
                 (lowerMessage.includes('training') || lowerMessage.includes('situation')))
            ) {
                showBotMessage(responses.faq_emergency_training);
            } else if (
                (lowerMessage.includes('qualification') || lowerMessage.includes('certification') || lowerMessage.includes('psira'))
            ) {
                showBotMessage(responses.faq_qualifications);
            } else if (
                (lowerMessage.includes('ongoing') || lowerMessage.includes('professional development') || lowerMessage.includes('refresher')) &&
                lowerMessage.includes('training')
            ) {
                showBotMessage(responses.faq_ongoing_training);
            } else if (
                (lowerMessage.includes('training') || lowerMessage.includes('train')) &&
                (lowerMessage.includes('guard') || lowerMessage.includes('staff') || lowerMessage.includes('employee') || lowerMessage.includes('employees'))
            ) {
                showBotMessage(responses.faq_training);
            } else if (
                (lowerMessage.includes('risk') && lowerMessage.includes('assessment')) ||
                lowerMessage.includes('security assessment')
            ) {
                showBotMessage(responses.faq_risk_assessment);
            } else if (
                (lowerMessage.includes('boom gate') || lowerMessage.includes('barrier gate'))
            ) {
                showBotMessage(responses.faq_boom_gate);
            } else if (
                lowerMessage.includes('event guarding') ||
                (lowerMessage.includes('event') && (lowerMessage.includes('guard') || lowerMessage.includes('security')))
            ) {
                showBotMessage(responses.faq_event_guarding);
            } else if (
                lowerMessage.includes('automation') || lowerMessage.includes('automated') || lowerMessage.includes('gate motor') || lowerMessage.includes('garage door')
            ) {
                if (lowerMessage.includes('service') || lowerMessage.includes('offer')) {
                    showBotMessage(responses.faq_gate_automation_services);
                } else if (lowerMessage.includes('how') || lowerMessage.includes('work')) {
                    showBotMessage(responses.faq_gate_automation_how);
                } else {
                    showBotMessage(responses.faq_gate_automation);
                }
            } else if (lowerMessage.includes('service') || lowerMessage.includes('security') || lowerMessage.includes('offer')) {
                showBotMessage(["🔍 I'll show you our comprehensive security services!", "📍 Taking you to our Services page..."]);
                setTimeout(() => {
                    window.location.href = 'services.html';
                }, 4000);
            } else if (lowerMessage.includes('contact') || lowerMessage.includes('phone') || lowerMessage.includes('email') || lowerMessage.includes('address') || lowerMessage.includes('reach')) {
                showBotMessage(["📞 I'll take you to our Contact page where you can find all our details!", "📍 Redirecting you now..."]);
                setTimeout(() => {
                    window.location.href = 'contact.html';
                }, 4000);
            } else if (lowerMessage.includes('gallery') || lowerMessage.includes('photo') || lowerMessage.includes('image') || lowerMessage.includes('picture')) {
                showBotMessage(["🖼️ I'll show you our gallery of operations and team!", "📍 Taking you to our Gallery page..."]);
                setTimeout(() => {
                    window.location.href = 'gallery.html';
                }, 4000);
            } else if (lowerMessage.includes('quote') || lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('pricing')) {
                showBotMessage(responses.quote);
            } else if (lowerMessage.includes('hour') || lowerMessage.includes('time') || lowerMessage.includes('when') || lowerMessage.includes('schedule')) {
                showBotMessage(responses.hours);
            } else if (lowerMessage.includes('job') || lowerMessage.includes('career') || lowerMessage.includes('work') || lowerMessage.includes('vacancy') || lowerMessage.includes('hiring')) {
                showBotMessage(responses.jobs);
            } else if (lowerMessage.includes('help') || lowerMessage.includes('menu') || lowerMessage.includes('option') || lowerMessage.includes('assist')) {
                showBotMessage(responses.help);
            } else if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey') || lowerMessage.includes('greeting')) {
                showBotMessage(responses.greeting);
            } else if (lowerMessage.includes('thank') || lowerMessage.includes('thanks') || lowerMessage.includes('appreciate')) {
                showBotMessage(["You're welcome! 😊", "Is there anything else I can help you with regarding your security needs?"]);
            } else if (lowerMessage.includes('bye') || lowerMessage.includes('goodbye') || lowerMessage.includes('farewell')) {
                showBotMessage(["Goodbye! 👋", "Stay safe, and don't hesitate to contact us if you need security services."]);
                setTimeout(closeChatbot, 5000);
            } else if (lowerMessage.includes('home') || lowerMessage.includes('main') || lowerMessage.includes('start')) {
                showBotMessage(["🏠 I'll take you to our homepage!", "📍 Redirecting you now..."]);
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 4000);
            } else {
                // Default response with menu options and helpful suggestions
                showBotMessage([
                    "🤔 I didn't quite catch that, but I'm here to help!",
                    "💡 **Try asking me about:**",
                    "• 'What is Vuyani & Soks?' → About us",
                    "• 'Show me your services' → Security services", 
                    "• 'How do I contact you?' → Contact details",
                    "• 'What are your hours?' → Working times",
                    "• 'Show me your gallery' → Photos of our work",
                    "",
                    "👆 **Or use the dropdown above for quick access!**"
                ]);
            }
        } catch (error) {
            console.error('Chatbot error: - chatbot.js:542', error);
            showBotMessage(responses.default);
        }
    }
    
    // Handle menu option click
    function handleMenuOption(option) {
        // Show user selection
        const optionText = getMenuOptionText(option);
        showUserMessage(optionText);

        // Redirect or show response
        setTimeout(() => {
            switch (option) {
                case 'about':
                    window.location.href = 'index.html';
                    break;
                case 'services':
                    window.location.href = 'services.html';
                    break;
                case 'contact':
                    window.location.href = 'contact.html';
                    break;
                default:
                    if (responses[option]) {
                        showBotMessage(responses[option]);
                    } else {
                        showBotMessage(responses.default);
                    }
                    break;
            }
        }, 500);
    }

    // Get menu option text
    function getMenuOptionText(option) {
        const optionMap = {
            'about': 'About Us',
            'services': 'Our Services',
            'quote': 'Get a Quote',
            'contact': 'Contact Us',
            'hours': 'Working Hours'
        };
        return optionMap[option] || option;
    }
    
    // Show welcome message
    function showWelcomeMessage() {
        // Add pulse animation to toggle button
        chatbotToggle.style.animation = 'pulse 2s infinite';
        
        // Show welcome message after a moment
        setTimeout(() => {
            openChatbot();
        }, 1000);
    }
    
    // Scroll to bottom of messages
    function scrollToBottom() {
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }
    
    // Escape HTML to prevent XSS
    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
    
    // Add pulse animation CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.1); }
            100% { transform: scale(1); }
        }
    `;
    document.head.appendChild(style);
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
