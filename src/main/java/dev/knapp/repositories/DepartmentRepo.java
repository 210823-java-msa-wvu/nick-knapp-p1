package dev.knapp.repositories;

import dev.knapp.models.Department;
import dev.knapp.models.User;
import dev.knapp.utils.HibernateUtil;
import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.hibernate.Transaction;
import org.hibernate.query.Query;

import java.util.List;

public class DepartmentRepo implements CrudRepository<Department> {
    @Override
    public Department add(Department d) {
        Session s = HibernateUtil.getSession();

        Transaction tx = null;

        try {
            tx = s.beginTransaction();
            s.save(d);
            tx.commit();
        } catch (HibernateException e){
            e.printStackTrace();
            if (tx != null)
                tx.rollback();
        } finally {
            s.close();
        }
        return d;
    }

    @Override
    public Department getById(Integer id) {
        Session s = HibernateUtil.getSession();

        //query the db
        Department d = s.get(Department.class, id);

        s.close();

        return d;
    }

    @Override
    public List<Department> getAll() {
        Session s = HibernateUtil.getSession();
        //create a query object
        String query = "from departments"; //HQL
        Query<Department> q = s.createQuery(query, Department.class);

        List<Department> departments = q.getResultList();

        s.close();

        return departments;
    }

    @Override
    public void update(Department d) {
        Transaction tx = null;
        try(Session s = HibernateUtil.getSession()){
            tx = s.beginTransaction();
            s.update(d);
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
