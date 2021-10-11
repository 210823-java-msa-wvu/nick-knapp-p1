package dev.knapp.models;

import javax.persistence.*;
import java.math.BigDecimal;

import java.time.LocalDate;
import java.time.LocalTime;


@Entity
@Table(name="\"RevatureP1\".events")
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int event_id;
    @Column(name="description")
    String description;
    @Column(name="event_date")
    LocalDate date;
    @Column(name="event_time")
    LocalTime time;
    @Column(name="event_location")
    String location;
    @Column(name="event_cost")
    BigDecimal cost;
    @Column(name="grading_format")
    String gradingFormat;
    @Column(name="passing_grade")
    String passingGrade;
    @Column(name="event_type")
    String eventType;

    public Event(){}

    public Event(int event_id, String description, LocalDate date, LocalTime time, String location, BigDecimal cost, String gradingFormat, String passingGrade, String eventType) {
        this.event_id = event_id;
        this.description = description;
        this.date = date;
        this.time = time;
        this.location = location;
        this.cost = cost;
        this.gradingFormat = gradingFormat;
        this.passingGrade = passingGrade;
        this.eventType = eventType;
    }

    public Event(String description, LocalDate date, LocalTime time, String location, BigDecimal cost, String gradingFormat, String passingGrade, String eventType) {
        this.description = description;
        this.date = date;
        this.time = time;
        this.location = location;
        this.cost = cost;
        this.gradingFormat = gradingFormat;
        this.passingGrade = passingGrade;
        this.eventType = eventType;
    }

    public int getEvent_id() {
        return event_id;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public LocalTime getTime() {
        return time;
    }

    public void setTime(LocalTime time) {
        this.time = time;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public BigDecimal getCost() {
        return cost;
    }

    public void setCost(BigDecimal cost) {
        this.cost = cost;
    }

    public String getGradingFormat() {
        return gradingFormat;
    }

    public void setGradingFormat(String gradingFormat) {
        this.gradingFormat = gradingFormat;
    }

    public String getPassingGrade() {
        return passingGrade;
    }

    public void setPassingGrade(String passingGrade) {
        this.passingGrade = passingGrade;
    }

    public String getEventType() {
        return eventType;
    }

    public void setEventType(String eventType) {
        this.eventType = eventType;
    }
}
