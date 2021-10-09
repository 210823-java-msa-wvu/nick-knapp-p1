package dev.knapp.repositories;

import dev.knapp.models.Event;
import dev.knapp.models.User;
import dev.knapp.utils.HibernateUtil;
import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.hibernate.Transaction;
import org.hibernate.query.Query;

import java.util.List;

public class EventRepo implements CrudRepository<Event>{
    @Override
    public Event add(Event event) {
        Session s = HibernateUtil.getSession();

        Transaction tx = null;

        try {
            tx = s.beginTransaction();
            s.save(event);
            tx.commit();
        } catch (HibernateException e){
            e.printStackTrace();
            if (tx != null)
                tx.rollback();
        } finally {
            s.close();
        }
        return event;
    }

    @Override
    public Event getById(Integer id) {
        Session s = HibernateUtil.getSession();

        //query the db
        Event e = s.get(Event.class, id);

        s.close();

        return e;
    }

    @Override
    public List<Event> getAll() {
        Session s = HibernateUtil.getSession();
        //create a query object
        String query = "from Event"; //HQL
        Query<Event> q = s.createQuery(query, Event.class);

        List<Event> events = q.getResultList();

        s.close();

        return events;
    }

    @Override
    public void update(Event event) {
        Transaction tx = null;
        try(Session s = HibernateUtil.getSession()){
            tx = s.beginTransaction();
            s.update(event);

        }catch (HibernateException e){
            e.printStackTrace();
            if (tx != null)
                tx.rollback();
        }

    }

    @Override
    public void delete(Integer id) {
        Transaction tx = null;
        try (Session s = HibernateUtil.getSession()){
            tx = s.beginTransaction();
            s.delete(id);
            tx.commit();
        }catch (HibernateException e){
            e.printStackTrace();
            if (tx != null)
                tx.rollback();
        }
    }
}
