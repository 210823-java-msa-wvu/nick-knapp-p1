package dev.knapp.services;

import dev.knapp.models.Event;
import dev.knapp.models.Reimbursement;
import dev.knapp.repositories.EventRepo;
import dev.knapp.repositories.ReimbursementRepo;

import java.util.List;

public class ReimbursementService {
    ReimbursementRepo reRepo = new ReimbursementRepo();

    public List<Reimbursement> getAllReimbursements() {
//
        return reRepo.getAll();
//
    }
    //
    public Reimbursement createReimbursement(Reimbursement r) {return reRepo.add(r);}

    public Reimbursement searchReimbursementById(Integer id) {
        return reRepo.getById(id);
    }
    //
//
    public void updateReimbursement(Reimbursement r) {
        reRepo.update(r);
    }
    //
    public void deleteReimbursement(Integer id) {
        reRepo.delete(id);
    }
}
