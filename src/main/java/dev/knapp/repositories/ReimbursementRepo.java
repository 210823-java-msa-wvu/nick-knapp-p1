package dev.knapp.repositories;

import dev.knapp.models.Reimbursement;
import dev.knapp.models.User;
import dev.knapp.utils.HibernateUtil;
import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.hibernate.Transaction;
import org.hibernate.query.Query;

import java.util.List;

public class ReimbursementRepo implements CrudRepository<Reimbursement> {
    @Override
    public Reimbursement add(Reimbursement r) {
        Session s = HibernateUtil.getSession();

        Transaction tx = null;

        try {
            tx = s.beginTransaction();
            s.save(r);
            tx.commit();
        } catch (HibernateException e){
            e.printStackTrace();
            if (tx != null)
                tx.rollback();
        } finally {
            s.close();
        }
        return r;
    }

    @Override
    public Reimbursement getById(Integer id) {
        Session s = HibernateUtil.getSession();

        //query the db
        Reimbursement r = s.get(Reimbursement.class, id);

        s.close();

        return r;
    }

    @Override
    public List<Reimbursement> getAll() {
        Session s = HibernateUtil.getSession();
        //create a query object
        String query = "from Reimbursement"; //HQL
        Query<Reimbursement> q = s.createQuery(query, Reimbursement.class);

        List<Reimbursement> reimbursements = q.getResultList();

        s.close();

        return reimbursements;
    }

    @Override
    public void update(Reimbursement r) {
        Transaction tx = null;
        try(Session s = HibernateUtil.getSession()){
            tx = s.beginTransaction();
            s.update(r);

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
