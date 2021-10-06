package dev.knapp.models;

import javax.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name="\"RevatureP1\".users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int user_id;
    @Column(name="firstname")
    String firstname;
    @Column(name="lastname")
    String lastname;
    @Column(name="email")
    String email;
    @Column(name="user_password")
    String password;
    @Column(name="available_reimbursement")
    BigDecimal availableReimbursement;
    @Column(name="ds_id")
    int dsId;
    @Column(name="dept_id")
    int deptId;
    @Column(name="is_ben_co")
    boolean isBenCo;

    public User(){ }

    public User(int user_id, String firstname, String lastname, String email, String password, BigDecimal availableReimbursement, int dsId, int deptId, boolean isBenCo) {
        this.user_id = user_id;
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.password = password;
        this.availableReimbursement = availableReimbursement;
        this.dsId = dsId;
        this.deptId = deptId;
        this.isBenCo = isBenCo;
    }

    public User(String firstname, String lastname, String email, String password, BigDecimal availableReimbursement, int dsId, int deptId, boolean isBenCo) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.password = password;
        this.availableReimbursement = availableReimbursement;
        this.dsId = dsId;
        this.deptId = deptId;
        this.isBenCo = isBenCo;
    }

    public int getUser_id() {
        return user_id;
    }

    public String getFirstname() {
        return firstname;
    }

    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }

    public String getLastname() {
        return lastname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public BigDecimal getAvailableReimbursement() {
        return availableReimbursement;
    }

    public void setAvailableReimbursement(BigDecimal availableReimbursement) {
        this.availableReimbursement = availableReimbursement;
    }

    public int getDsId() {
        return dsId;
    }

    public void setDsId(int dsId) {
        this.dsId = dsId;
    }

    public int getDeptId() {
        return deptId;
    }

    public void setDeptId(int deptId) {
        this.deptId = deptId;
    }

    public boolean isBenCo() {
        return isBenCo;
    }

    public void setBenCo(boolean benCo) {
        isBenCo = benCo;
    }
}
