package dev.knapp.models;

import javax.persistence.*;

@Entity
@Table(name="\"RevatureP1\".departments")
public class Department {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int dept_id;
    @Column(name="dept_name")
    String deptName;
    @Column(name="dept_head_id")
    int deptHeadId;

    public Department(){}

    public Department(int dept_id, String deptName, int deptHeadId) {
        this.dept_id = dept_id;
        this.deptName = deptName;
        this.deptHeadId = deptHeadId;
    }

    public Department(String deptName, int deptHeadId) {
        this.deptName = deptName;
        this.deptHeadId = deptHeadId;
    }

    public int getDept_id() {
        return dept_id;
    }

    public String getDeptName() {
        return deptName;
    }

    public void setDeptName(String deptName) {
        this.deptName = deptName;
    }

    public int getDeptHeadId() {
        return deptHeadId;
    }

    public void setDeptHeadId(int deptHeadId) {
        this.deptHeadId = deptHeadId;
    }
}
