package com.gouravkumar.portfolio.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.gouravkumar.portfolio.model.ContactMessage;
import com.gouravkumar.portfolio.repository.ContactMessageRepository;
import com.gouravkumar.portfolio.service.EmailService;

@RestController
@RequestMapping("/contact")
@CrossOrigin(origins = {"http://localhost:4200", "https://portfolio-juhw.onrender.com"})
public class ContactController {
    
    @GetMapping("/health")
    public ResponseEntity<String> healthCheck() {
        return ResponseEntity.ok("Contact service is running");
    }
    
    @Autowired
    private ContactMessageRepository contactMessageRepository;
    
    @Autowired
    private EmailService emailService;
    
    @PostMapping("/send")
    @Transactional
    public ResponseEntity<ContactMessage> sendMessage(@RequestBody ContactMessage message) {
        try {
            // First, save the contact message to database
            ContactMessage savedMessage = contactMessageRepository.save(message);
            System.out.println("Contact message saved successfully with ID: " + savedMessage.getId());
            
            // Try to send emails asynchronously (don't let email failures affect database save)
            try {
                emailService.sendContactEmail(savedMessage);
            } catch (Exception emailError) {
                System.err.println("Failed to send notification email: " + emailError.getMessage());
                // Continue execution - don't fail the entire request
            }
            
            try {
                emailService.sendAutoReply(savedMessage);
            } catch (Exception emailError) {
                System.err.println("Failed to send auto-reply email: " + emailError.getMessage());
                // Continue execution - don't fail the entire request
            }
            
            return ResponseEntity.ok(savedMessage);
        } catch (Exception e) {
            System.err.println("Error processing contact message: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }
    
    @GetMapping
    public ResponseEntity<List<ContactMessage>> getAllMessages() {
        List<ContactMessage> messages = contactMessageRepository.findAllByOrderByCreatedAtDesc();
        return ResponseEntity.ok(messages);
    }
    
    @GetMapping("/unread")
    public ResponseEntity<List<ContactMessage>> getUnreadMessages() {
        List<ContactMessage> messages = contactMessageRepository.findByIsReadFalseOrderByCreatedAtDesc();
        return ResponseEntity.ok(messages);
    }
    
    @GetMapping("/count/unread")
    public ResponseEntity<Long> getUnreadCount() {
        Long count = contactMessageRepository.countUnreadMessages();
        return ResponseEntity.ok(count);
    }
    
    @PostMapping("/test-email")
    public ResponseEntity<String> testEmail() {
        try {
            ContactMessage testMessage = new ContactMessage();
            testMessage.setName("Test User");
            testMessage.setEmail("test@example.com");
            testMessage.setSubject("Test Email");
            testMessage.setMessage("This is a test email to verify email functionality");
            
            emailService.sendContactEmail(testMessage);
            return ResponseEntity.ok("Test email sent successfully");
        } catch (Exception e) {
            System.err.println("Test email failed: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(500).body("Test email failed: " + e.getMessage());
        }
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<ContactMessage> getMessageById(@PathVariable Long id) {
        Optional<ContactMessage> message = contactMessageRepository.findById(id);
        return message.map(ResponseEntity::ok)
                     .orElse(ResponseEntity.notFound().build());
    }
    
    @PutMapping("/{id}/read")
    @Transactional
    public ResponseEntity<ContactMessage> markAsRead(@PathVariable Long id) {
        Optional<ContactMessage> optionalMessage = contactMessageRepository.findById(id);
        if (optionalMessage.isPresent()) {
            ContactMessage message = optionalMessage.get();
            message.setIsRead(true);
            ContactMessage updatedMessage = contactMessageRepository.save(message);
            return ResponseEntity.ok(updatedMessage);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    
    @DeleteMapping("/{id}")
    @Transactional
    public ResponseEntity<Void> deleteMessage(@PathVariable Long id) {
        if (contactMessageRepository.existsById(id)) {
            contactMessageRepository.deleteById(id);
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
