document.addEventListener('DOMContentLoaded', function() {
  const chatMessages = document.getElementById('chat-messages');
  const userInput = document.getElementById('user-input');
  const sendButton = document.getElementById('send-button');
  const clearChatButton = document.getElementById('clear-chat');

  // Simple responses dictionary
  const responses = {
    "hello": "Hi there! How can I help you today?",
    "hi": "Hello! Nice to meet you!",
    "hey": "Hey! How's your day going?",
    "how are you": "I'm just a simple bot, but I'm doing well! How are you?",
    "what is your name": "I'm SimpleBot, a JavaScript chatbot.",
    "who made you": "I was created using HTML, CSS, and JavaScript.",
    "who created you": "A developer brought me to life using JavaScript!",
    "bye": "Goodbye! Have a great day!",
    "goodbye": "See you later! Take care!",
    "thank you": "You're welcome! Is there anything else I can help with?",
    "thanks": "No problem! Happy to help.",
    "help": "I can answer simple questions. Try asking about my name, features, or saying hello!",
    "what can you do": "I can chat with you, tell jokes, share facts, and provide motivation!",
    "features": "I'm a simple chatbot that can respond to greetings, tell jokes, share facts, and offer encouragement!",
    "how do you work": "I use simple pattern matching in JavaScript to respond to your messages.",
    
    // Jokes
    "joke": "Why don't scientists trust atoms? Because they make up everything!",
    "another joke": "Why did the JavaScript developer wear glasses? Because he couldn't C#!",
    "tell me a joke": "Why do programmers prefer dark mode? Because light attracts bugs!",
    "funny": "I know some jokes! Want to hear one?",
    
    // Fun Facts
    "tell me a fact": "Did you know? Honey never spoils. Archaeologists have found pots of honey in ancient Egyptian tombs that are over 3,000 years old and still perfectly good!",
    "random fact": "Did you know? Octopuses have three hearts and their blood is blue!",
    "fun fact": "Here’s something cool: A bolt of lightning is five times hotter than the surface of the sun!",
    
    // Motivation
    "motivate me": "You got this! Remember, every expert was once a beginner. Keep pushing forward!",
    "inspire me": "Believe in yourself! The only way to achieve greatness is to take the first step.",
    "encouragement": "Don't give up! Every small step you take brings you closer to success.",
    
    // Riddles
    "riddle": "I speak without a mouth and hear without ears. I have no body, but I come alive with the wind. What am I? (Answer: An echo)",
    "give me a riddle": "What has to be broken before you can use it? (Answer: An egg)",
    
    // Weather & Time
    "weather": "I'm sorry, I don't have access to weather data. Try checking a weather website!",
    "time": "I can't check the time, but your device should have a clock!",
    
    // Conversational Fillers
    "what's up": "Not much, just chatting with you! What about you?",
    "how's your day": "I'm having a great day! Thanks for asking. How about you?",
    "what do you like": "I like chatting with you and learning new things!",
    "are you a robot": "Yes, I am a chatbot, but I love talking with humans!",
    
    // Simple Math
    "what is 2 + 2": "Easy! The answer is 4.",
    "solve 10 + 15": "That’s 25!",
    
    // Greetings Variations
    "good morning": "Good morning! Hope you have a fantastic day!",
    "good afternoon": "Good afternoon! How's your day going?",
    "good evening": "Good evening! Relax and enjoy your time!",
    
    // Misc
    "do you sleep": "Nope! I’m always here to chat whenever you need me.",
    "are you real": "I'm as real as the code that created me!",
    "can you sing": "I can't sing, but I can tell you a joke instead!",
    "can you dance": "I wish I could, but my circuits aren't programmed for that... yet!"
};

  // Function to add a message to the chat and save to localStorage
  function addMessage(message, isUser = false) {
      const messageDiv = document.createElement('div');
      messageDiv.classList.add('message');
      messageDiv.classList.add(isUser ? 'user-message' : 'bot-message');
      
      const messageContent = document.createElement('div');
      messageContent.classList.add('message-content');
      messageContent.textContent = message;
      
      messageDiv.appendChild(messageContent);
      chatMessages.appendChild(messageDiv);
      
      // Scroll to the bottom of the chat
      chatMessages.scrollTop = chatMessages.scrollHeight;

      // Save to localStorage
      saveToLocalStorage(message, isUser);
  }

  // Function to save message to localStorage
  function saveToLocalStorage(message, isUser) {
      let chatHistory = JSON.parse(localStorage.getItem('chatHistory')) || [];
      chatHistory.push({ message, isUser });
      localStorage.setItem('chatHistory', JSON.stringify(chatHistory));
  }

  // Function to load chat history from localStorage
  function loadChatHistory() {
      const chatHistory = JSON.parse(localStorage.getItem('chatHistory')) || [];
      chatHistory.forEach(item => addMessage(item.message, item.isUser));
  }

  // Function to clear chat history
  function clearChatHistory() {
      localStorage.removeItem('chatHistory');
      chatMessages.innerHTML = '';
      addMessage("Chat history cleared. How can I help you today?", false);
  }

  // Function to get a response based on user input
  function getBotResponse(message) {
      const lowerMessage = message.toLowerCase();
      
      if (responses[lowerMessage]) {
          return responses[lowerMessage];
      }
      
      for (const key in responses) {
          if (lowerMessage.includes(key)) {
              return responses[key];
          }
      }
      
      return "I'm not sure how to respond to that. Try asking something else!";
  }

  // Function to handle sending a message
  function handleSendMessage() {
      const message = userInput.value.trim();
      
      if (message) {
          addMessage(message, true);
          userInput.value = '';
          
          const typingDiv = document.createElement('div');
          typingDiv.classList.add('message', 'bot-message', 'typing-indicator');
          typingDiv.innerHTML = '<div class="message-content">Bot is typing...</div>';
          chatMessages.appendChild(typingDiv);
          chatMessages.scrollTop = chatMessages.scrollHeight;
          
          setTimeout(() => {
              chatMessages.removeChild(typingDiv);
              const response = getBotResponse(message);
              addMessage(response);
          }, 1000);
      }
  }

  // Event listeners
  sendButton.addEventListener('click', handleSendMessage);
  
  userInput.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
          handleSendMessage();
      }
  });

  clearChatButton.addEventListener('click', clearChatHistory);

  // Load chat history on page load
  loadChatHistory();

  // If no chat history, add a welcome message
  if (chatMessages.children.length === 0) {
      addMessage("Hello! I'm a simple JavaScript chatbot. How can I help you today?", false);
  }
});