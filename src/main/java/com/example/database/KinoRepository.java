package com.example.database;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class KinoRepository {

    @Autowired
    private JdbcTemplate db;


    //Lagrer billettene i databasen
    public void lagreBillett (KinoBilletter innBillett){
        String sql ="INSERT INTO KinoBilletter (film, antall,fornavn, etternavn, telefonnr, epost) VALUES(?,?,?,?,?,?)";
        db.update(sql,innBillett.getFilm(),innBillett.getAntall(), innBillett.getFornavn(),innBillett.getEtternavn(),
                innBillett.getTelefonnr(),innBillett.getEpost());
    }

    //Lagrer billettene fra databasen
    public List<KinoBilletter> hentBilletter (){
        String sql ="SELECT*FROM KinoBilletter";
        List<KinoBilletter> dineBilletter = db.query(sql,new BeanPropertyRowMapper<>(KinoBilletter.class));
        return dineBilletter;
    }

    //Funksjon for å slette alle billettene på databasen
    public void slettBilletter(){
        String sql="DELETE FROM KinoBilletter";
        db.update(sql);
    }

    //Funksjon for å slette enkeltbilletter basert på ID på databasen
    public void slettBillett(long id){
        String sql = "DELETE FROM KinoBilletter WHERE id = ?";
        db.update(sql, id);
    }
}
