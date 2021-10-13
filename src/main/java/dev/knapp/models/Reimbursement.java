package dev.knapp.models;

import javax.persistence.*;
import java.math.BigDecimal;

//@JsonIgnoreProperties(ignoreUnknown = true)
@Entity
@Table(name="\"RevatureP1\".reimbursements")
public class Reimbursement {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)//was identity
    Integer re_id;

    //@ManyToOne
    @Column(name="user_id")
    Integer userId;

    //@ManyToOne
    @Column(name="event_id")
    Integer eventId;

    @Column(name="is_urgent")
    Boolean urgent;
    @Column(name="status")
    String status;
    @Column(name="justification")
    String justification;
    @Column(name="projected_reimbursment")//column name is misspelled in postrgresql
    BigDecimal projectedReimbursement;
    @Column(name="amount_reimbursed")
    BigDecimal amountReimbursed;
    @Column(name="is_over_available")
    Boolean overAvailable;
    @Column(name="is_over_justification")
    String overJustification;
    @Column(name="grade_received")
    String gradeReceived;
    @Column(name="work_time_missed_hrs")
    Float workTimeMissed;//hours

    /*
    * If you have a date you're dealing with you might need this in your class or method:
        DateFormat df = new SimpleDateFormat("yyyy-MM-dd");
        om.setDateFormat(df);

    *
    *
    * */

    public Reimbursement(){}

    public Reimbursement(int re_id, int userId, int eventId, boolean urgent, String status, String justification, BigDecimal projectedReimbursement, BigDecimal amountReimbursed, boolean overAvailable, String overJustification, String gradeReceived, float workTimeMissed) {
        this.re_id = re_id;
        this.userId = userId;
        this.eventId = eventId;
        this.urgent = urgent;
        this.status = status;
        this.justification = justification;
        this.projectedReimbursement = projectedReimbursement;
        this.amountReimbursed = amountReimbursed;
        this.overAvailable = overAvailable;
        this.overJustification = overJustification;
        this.gradeReceived = gradeReceived;
        this.workTimeMissed = workTimeMissed;
    }

    public Reimbursement(int userId, int eventId, boolean urgent, String status, String justification, BigDecimal projectedReimbursement, BigDecimal amountReimbursed, boolean overAvailable, String overJustification, String gradeReceived, float workTimeMissed) {
        this.userId = userId;
        this.eventId = eventId;
        this.urgent = urgent;
        this.status = status;
        this.justification = justification;
        this.projectedReimbursement = projectedReimbursement;
        this.amountReimbursed = amountReimbursed;
        this.overAvailable = overAvailable;
        this.overJustification = overJustification;
        this.gradeReceived = gradeReceived;
        this.workTimeMissed = workTimeMissed;
    }

    public Integer getRe_id() {
        return re_id;
    }

    public void setRe_id(Integer re_id) {
        this.re_id = re_id;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public Integer getEventId() {
        return eventId;
    }

    public void setEventId(Integer eventId) {
        this.eventId = eventId;
    }

    public Boolean getUrgent() {
        return urgent;
    }

    public void setUrgent(Boolean urgent) {
        this.urgent = urgent;
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

    public Boolean getOverAvailable() {
        return overAvailable;
    }

    public void setOverAvailable(Boolean overAvailable) {
        this.overAvailable = overAvailable;
    }

    public String getOverJustification() {
        return overJustification;
    }

    public void setOverJustification(String overJustification) {
        this.overJustification = overJustification;
    }

    public String getGradeReceived() {
        return gradeReceived;
    }

    public void setGradeReceived(String gradeReceived) {
        this.gradeReceived = gradeReceived;
    }

    public Float getWorkTimeMissed() {
        return workTimeMissed;
    }

    public void setWorkTimeMissed(Float workTimeMissed) {
        this.workTimeMissed = workTimeMissed;
    }
}
