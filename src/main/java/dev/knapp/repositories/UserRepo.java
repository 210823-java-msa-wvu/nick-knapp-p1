package dev.knapp.repositories;

import dev.knapp.models.User;
import dev.knapp.utils.HibernateUtil;
import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.hibernate.Transaction;
import org.hibernate.query.Query;


import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import java.util.List;

public class UserRepo implements CrudRepository<User>{

    @Override
    public User add(User u) {
        Session s = HibernateUtil.getSession();

        Transaction tx = null;

        try {
            tx = s.beginTransaction();
            s.save(u);
            tx.commit();
        } catch (HibernateException e){
            e.printStackTrace();
            if (tx != null)
                tx.rollback();
        } finally {
            s.close();
        }
        return u;
    }

    @Override
    public User getById(Integer id) {
        //get session
        Session s = HibernateUtil.getSession();

        //query the db
        User u = s.get(User.class, id);

        s.close();

        return u;
    }

    public User getByEmail(String email){

        User u = null;
        Session s = HibernateUtil.getSession();
        try{
            CriteriaBuilder cb = s.getCriteriaBuilder();
            CriteriaQuery<User> criteriaQuery = cb.createQuery(User.class);
            Root<User> root = criteriaQuery.from(User.class);
            Predicate p = cb.equal(root.get("email"), email);
            criteriaQuery.select(root).where(p);
            u = s.createQuery(criteriaQuery).getSingleResult();
        }catch (HibernateException e){
            e.printStackTrace();
        } finally {
            s.close();
        }
        return u;


    }

    @Override
    public List<User> getAll() {

        Session s = HibernateUtil.getSession();
        //create a query object
        String query = "from users"; //HQL
        Query<User> q = s.createQuery(query, User.class);

        List<User> users = q.getResultList();

        s.close();

        return users;
    }

    @Override
    public void update(User u) {
        Transaction tx = null;
        try(Session s = HibernateUtil.getSession()){
            tx = s.beginTransaction();
            s.update(u);

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
