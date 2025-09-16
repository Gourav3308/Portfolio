package com.gouravkumar.portfolio.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.gouravkumar.portfolio.model.ContactMessage;

@Repository
public interface ContactMessageRepository extends JpaRepository<ContactMessage, Long> {
    
    List<ContactMessage> findByIsReadFalseOrderByCreatedAtDesc();
    
    List<ContactMessage> findAllByOrderByCreatedAtDesc();
    
    @Query("SELECT COUNT(c) FROM ContactMessage c WHERE c.isRead = false")
    Long countUnreadMessages();
}
