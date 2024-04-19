package com.example.database;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;


import java.util.*;

@RestController
public class KinoBilletterController {

    //Brukes for databaser operations
    @Autowired
    public KinoRepository rep;

    //Endpoint
    @GetMapping("/filmVelger")
    public ArrayList<String> filmVelger(){
        ArrayList<String> filmliste = new ArrayList<>();
        filmliste.add("The Hunger Games");
        filmliste.add("Julefeiren");
        filmliste.add("Fallout");
        return filmliste;
    }

    //Endpoint
    @PostMapping("/lagre")
    public void lagreBillett(KinoBilletter innBillett){
        rep.lagreBillett(innBillett);
    }

    //Endpoint
    @GetMapping("/hentBilletter")
    public List<KinoBilletter> hentBilletter(){
        List<KinoBilletter> billetter =rep.hentBilletter();
        //Sortere billettene basert på etternavn
        Collections.sort(billetter, Comparator.comparing(KinoBilletter::getEtternavn));
        return billetter;

    }

    //Endpoint
    @GetMapping("/slettAlle")
    public void slettAlle(){
        rep.slettBilletter();
    }

    //Endpoint
    @GetMapping("/slettBillett/{id}")
    public void slettBillett(@PathVariable int id){
        rep.slettBillett(id);
    }

}
