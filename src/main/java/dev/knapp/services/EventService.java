package dev.knapp.services;

import dev.knapp.models.Event;
import dev.knapp.models.User;
import dev.knapp.repositories.EventRepo;

import java.util.List;

public class EventService {
    EventRepo eventRepo = new EventRepo();

    public List<Event> getAllEvents() {
//
        return eventRepo.getAll();
//
    }
//
    public Event createEvent(Event event) {return eventRepo.add(event);}

    public Event searchEventById(Integer id) {
        return eventRepo.getById(id);
    }
//
//
    public void updateEvent(Event event) {
        eventRepo.update(event);
    }
//
    public void deleteEvent(Integer id) {
        eventRepo.delete(id);
    }
}
