package dev.knapp.services;

import dev.knapp.models.Department;
import dev.knapp.models.User;
import dev.knapp.repositories.DepartmentRepo;

import java.util.List;

public class DepartmentService {
    DepartmentRepo deptRepo = new DepartmentRepo();

    public List<Department> getAllDepartments() {

        return deptRepo.getAll();

    }

    public Department createDepartment(Department d) {return deptRepo.add(d);}

    public Department searchDepartmentById(Integer id) {
        return deptRepo.getById(id);
    }


    public void updateDepartment(Department d) {
        deptRepo.update(d);
    }

    public void deleteDepartment(Integer id) {
        deptRepo.delete(id);
    }
}
