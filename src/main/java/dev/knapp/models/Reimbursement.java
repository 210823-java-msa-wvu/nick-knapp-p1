package dev.knapp.models;

import javax.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name="\"RevatureP1\".reimbursements")
public class Reimbursement {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int re_id;
    @Column(name="user_id")
    int userId;
    @Column(name="event_id")
    int eventId;
    @Column(name="is_urgent")
    boolean isUrgent;
    @Column(name="status")
    String status;
    @Column(name="justification")
    String justification;
    @Column(name="projected_reimbursment")//column name is misspelled in postrgresql
    BigDecimal projectedReimbursement;
    @Column(name="amount_reimbursed")
    BigDecimal amountReimbursed;
    @Column(name="is_over_available")
    boolean isOverAvailable;
    @Column(name="is_over_justification")
    String isOverJustification;
    @Column(name="grade_received")
    String gradeReceived;
    @Column(name="work_time_missed_hrs")
    float workTimeMissed;//hours

    public Reimbursement(int re_id, int userId, int eventId, boolean isUrgent, String status, String justification, BigDecimal projectedReimbursement, BigDecimal amountReimbursed, boolean isOverAvailable, String isOverJustification, String gradeReceived, float workTimeMissed) {
        this.re_id = re_id;
        this.userId = userId;
        this.eventId = eventId;
        this.isUrgent = isUrgent;
        this.status = status;
        this.justification = justification;
        this.projectedReimbursement = projectedReimbursement;
        this.amountReimbursed = amountReimbursed;
        this.isOverAvailable = isOverAvailable;
        this.isOverJustification = isOverJustification;
        this.gradeReceived = gradeReceived;
        this.workTimeMissed = workTimeMissed;
    }

    public Reimbursement(int userId, int eventId, boolean isUrgent, String status, String justification, BigDecimal projectedReimbursement, BigDecimal amountReimbursed, boolean isOverAvailable, String isOverJustification, String gradeReceived, float workTimeMissed) {
        this.userId = userId;
        this.eventId = eventId;
        this.isUrgent = isUrgent;
        this.status = status;
        this.justification = justification;
        this.projectedReimbursement = projectedReimbursement;
        this.amountReimbursed = amountReimbursed;
        this.isOverAvailable = isOverAvailable;
        this.isOverJustification = isOverJustification;
        this.gradeReceived = gradeReceived;
        this.workTimeMissed = workTimeMissed;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public int getEventId() {
        return eventId;
    }

    public void setEventId(int eventId) {
        this.eventId = eventId;
    }

    public boolean isUrgent() {
        return isUrgent;
    }

    public void setUrgent(boolean urgent) {
        isUrgent = urgent;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getJustification() {
        return justification;
    }

    public void setJustification(String justification) {
        this.justification = justification;
    }

    public BigDecimal getProjectedReimbursement() {
        return projectedReimbursement;
    }

    public void setProjectedReimbursement(BigDecimal projectedReimbursement) {
        this.projectedReimbursement = projectedReimbursement;
    }

    public BigDecimal getAmountReimbursed() {
        return amountReimbursed;
    }

    public void setAmountReimbursed(BigDecimal amountReimbursed) {
        this.amountReimbursed = amountReimbursed;
    }

    public boolean isOverAvailable() {
        return isOverAvailable;
    }

    public void setOverAvailable(boolean overAvailable) {
        isOverAvailable = overAvailable;
    }

    public String getIsOverJustification() {
        return isOverJustification;
    }

    public void setIsOverJustification(String isOverJustification) {
        this.isOverJustification = isOverJustification;
    }

    public String getGradeReceived() {
        return gradeReceived;
    }

    public void setGradeReceived(String gradeReceived) {
        this.gradeReceived = gradeReceived;
    }

    public float getWorkTimeMissed() {
        return workTimeMissed;
    }

    public void setWorkTimeMissed(float workTimeMissed) {
        this.workTimeMissed = workTimeMissed;
    }
}
