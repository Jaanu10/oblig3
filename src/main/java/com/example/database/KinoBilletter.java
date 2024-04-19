package com.example.database;


public class KinoBilletter {
    private int id;
    private int antall;
    private String fornavn;
    private String etternavn;
    private int telefonnr;
    private String epost;
    private String film;


    public KinoBilletter (int id, int antall, String fornavn, String etternavn, int telefonnr, String epost, String film){
        this.id=id;
        this.antall=antall;
        this.fornavn=fornavn;
        this.etternavn=etternavn;
        this.telefonnr=telefonnr;
        this.epost=epost;
        this.film=film;
    }

    public KinoBilletter(){}
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getAntall() {
        return antall;
    }

    public void setAntall(int antall) {
        this.antall = antall;
    }

    public String getFornavn() {
        return fornavn;
    }

    public void setFornavn(String fornavn) {
        this.fornavn = fornavn;
    }

    public String getEtternavn() {
        return etternavn;
    }

    public void setEtternavn(String etternavn) {
        this.etternavn = etternavn;
    }

    public int getTelefonnr() {
        return telefonnr;
    }

    public void setTelefonnr(int telefonnr) {
        this.telefonnr = telefonnr;
    }

    public String getEpost() {
        return epost;
    }

    public void setEpost(String epost) {
        this.epost = epost;
    }

    public String getFilm() {
        return film;
    }

    public void setFilm(String film) {
        this.film = film;
    }
}
