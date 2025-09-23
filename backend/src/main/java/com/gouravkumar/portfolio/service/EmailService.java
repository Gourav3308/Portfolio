package com.gouravkumar.portfolio.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.gouravkumar.portfolio.model.ContactMessage;

@Service
public class EmailService {
    
    @Autowired
    private JavaMailSender mailSender;
    
    @Value("${spring.mail.username}")
    private String fromEmail;
    
    @Value("${spring.mail.host}")
    private String mailHost;
    
    @Value("${spring.mail.port}")
    private int mailPort;
    
    public void sendContactEmail(ContactMessage contactMessage) {
        try {
            System.out.println("=== EMAIL SERVICE DEBUG ===");
            System.out.println("Mail Host: " + mailHost);
            System.out.println("Mail Port: " + mailPort);
            System.out.println("From Email: " + fromEmail);
            System.out.println("JavaMailSender: " + (mailSender != null ? "Available" : "NULL"));
            
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom(fromEmail);
            message.setTo(fromEmail); // Send to your email
            message.setSubject("Portfolio Contact: " + contactMessage.getSubject());
            
            String emailBody = String.format(
                "Hello Gourav,\n\n" +
                "You have received a new message from your portfolio website:\n\n" +
                "From: %s\n" +
                "Email: %s\n" +
                "Subject: %s\n" +
                "Message: %s\n\n" +
                "---\n" +
                "This message was sent from your portfolio contact form.",
                contactMessage.getName(),
                contactMessage.getEmail(),
                contactMessage.getSubject(),
                contactMessage.getMessage()
            );
            
            message.setText(emailBody);
            
            System.out.println("Attempting to send email...");
            mailSender.send(message);
            System.out.println("✅ Email sent successfully to: " + fromEmail);
            System.out.println("=== EMAIL SEND COMPLETE ===");
        } catch (Exception e) {
            System.err.println("❌ Error sending email: " + e.getMessage());
            System.err.println("Error class: " + e.getClass().getSimpleName());
            e.printStackTrace();
            // Don't throw exception - let the caller handle it
        }
    }
    
    public void sendAutoReply(ContactMessage contactMessage) {
        try {
            System.out.println("=== AUTO-REPLY DEBUG ===");
            System.out.println("Sending auto-reply to: " + contactMessage.getEmail());
            
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom(fromEmail);
            message.setTo(contactMessage.getEmail()); // Reply to sender
            message.setSubject("Thank you for contacting Gourav Kumar");
            
            String replyBody = String.format(
                "Dear %s,\n\n" +
                "Thank you for reaching out to me through my portfolio website!\n\n" +
                "I have received your message regarding: %s\n\n" +
                "I will review your message and get back to you as soon as possible.\n\n" +
                "Best regards,\n" +
                "Gourav Kumar\n" +
                "Java Full Stack Developer\n\n" +
                "---\n" +
                "Email: gouravkrsah78@gmail.com\n" +
                "Phone: +91 7903840357\n" +
                "LinkedIn: https://www.linkedin.com/in/gourav-java-dev\n" +
                "GitHub: https://github.com/Gourav3308",
                contactMessage.getName(),
                contactMessage.getSubject()
            );
            
            message.setText(replyBody);
            mailSender.send(message);
            
            System.out.println("✅ Auto-reply sent successfully to: " + contactMessage.getEmail());
            System.out.println("=== AUTO-REPLY COMPLETE ===");
        } catch (Exception e) {
            System.err.println("❌ Error sending auto-reply: " + e.getMessage());
            System.err.println("Error class: " + e.getClass().getSimpleName());
            e.printStackTrace();
            // Don't throw exception for auto-reply failure
        }
    }
}
