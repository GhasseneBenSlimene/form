document.forms[0].onsubmit= function(e){
    e.preventDefault();

    //Vérification de données
    var nom=document.getElementById("nom");
    var pren=document.getElementById("Prénom");
    var date=document.getElementById("date_n");
    var lieu=document.getElementById("lieu_n");
    //Gouvernaorat selectionné
    var select_gov=document.getElementById("gouv_n");
    var gouv=select_gov.options[select_gov.selectedIndex].textContent;
    //Etat civil selectionné
    var select_civ=document.getElementById("etat_civil");
    var civ=select_civ.options[select_civ.selectedIndex].textContent;
    //Stuation militaire selectionné
    var select_situa=document.getElementById("situa_mil");
    var situa=select_situa.options[select_situa.selectedIndex].textContent;

    function condition(nom_classe,newcd,num){
        var br = document.getElementsByClassName(nom_classe)[num];
        var cd = document.createElement("p");
        cd.className="condition";
        cd.id=nom_classe+"_"+num;
        cd.innerText=newcd;
        br.parentNode.replaceChild(cd,br);
    }

    //Ecriture des conditions
    if(document.getElementById("nom_br_0")===null){
        condition("nom_br","Le nom contient que des lettres",1);
        condition("nom_br","Le longueur de nom < 30",0);
        condition("pre_br","Le nom contient que des lettres",1);
        condition("pre_br","Le longueur de prénom < 30",0);
        condition("date_br","Age: +18",0);
        condition("bac_br","L'année se compose de 4 chiffre",0);
        condition("etab_br","Le longueur de nom < 50",0);
        condition("fil_br","Le longueur de nom < 15",0);
        condition("tel_br","Nombre des chiffres de Téléphone = 8",0);
        condition("em_br","Email confirmé",0);
    }

    //Coloration des conditions
    var test_cd=true;

    if(nom.value.length<30){
        document.getElementById("nom_br_0").style.color="blue";
    }else{
        document.getElementById("nom_br_0").style.color="#bf0303";
        test_cd=false;
    }

    if(/^[a-zA-Z() ]+$/.test(nom.value)){
        document.getElementById("nom_br_1").style.color="blue";
    }else{
        document.getElementById("nom_br_1").style.color="#bf0303";
        test_cd=false;
    }

    if(pren.value.length<30){
        document.getElementById("pre_br_0").style.color="blue";
    }else{
        document.getElementById("pre_br_0").style.color="#bf0303";
        test_cd=false;
    }

    if(/^[a-zA-Z() ]+$/.test(pren.value)){
        document.getElementById("pre_br_1").style.color="blue";
    }else{
        document.getElementById("pre_br_1").style.color="#bf0303";
        test_cd=false;
    }

    var bac=document.getElementById("Annee bac");
    var etab=document.getElementById("etablissement");
    var fil=document.getElementById("filiere");
    var telephone=document.getElementById("telephone");

    if(bac.value.length===4){
        document.getElementById("bac_br_0").style.color="blue";
    }else{
        document.getElementById("bac_br_0").style.color="#bf0303";
        test_cd=false;
    }

    if(etab.value.length<50){
        document.getElementById("etab_br_0").style.color="blue";
    }else{
        document.getElementById("etab_br_0").style.color="#bf0303";
        test_cd=false;
    }

    if(fil.value.length<15){
        document.getElementById("fil_br_0").style.color="blue";
    }else{
        document.getElementById("fil_br_0").style.color="#bf0303";
        test_cd=false;
    }

    if(telephone.value.length===8){
        document.getElementById("tel_br_0").style.color="blue";
    }else{
        document.getElementById("tel_br_0").style.color="#bf0303";
        test_cd=false;
    }

    var mail=document.getElementById("mail");
    var mail_c=document.getElementById("mail-c");

    if(mail.value===mail_c.value){
        document.getElementById("em_br_0").style.color="blue";
    }else{
        document.getElementById("em_br_0").style.color="#bf0303";
        test_cd=false;
    }

    var now = new Date();
    var in_date= new Date(date.value);
    var age=(now.getTime()-in_date.getTime())/31556952000;

    if(age>=18){
        document.getElementById("date_br_0").style.color="blue";
    }else{
        document.getElementById("date_br_0").style.color="#bf0303";
        test_cd=false;
    }
    
    var sty = document.createElement("style");
    sty.innerHTML=`.condition{font-size:12px}`


    //table de resumé
    if(test_cd){
        //Informations générales
        var tun=document.getElementById("n_box1");
        var autre=document.getElementById("n_box2");
        if(document.getElementById("checkDiv")===null){
            var DivTab= document.createElement("div");
            DivTab.id="checkDiv";
            document.body.appendChild(DivTab);
        }
        document.getElementById("checkDiv").innerHTML=
        `<center><h1 id="titre_res">RESUMÉ<h1></center>
        <center><table id="tab_res">
            <tbody id="resume">
                <tr>
                    <th colspan="6">Informations générales</th>
                </tr>
                <tr>
                    <td colspan="1">Nom: <strong>${nom.value}<\strong></td>
                    <td colspan="2"></td>
                    <td colspan="2">Prénom: <strong>${pren.value}</strong></td>
                </tr>
                <tr id="naissance_1">
                    <td colspan="3">Date de naissance: <strong>${date.value}</strong></td>
                    <td colspan="3">Lieu de naissance: <strong>${lieu.value}</strong></td>
                </tr>
                <tr id="naissance">
                    <td colspan="6">Gouvernorat de naissance: <strong>${gouv}</strong></td>
                </tr>
            <tbody>
        </table>`;

        var in_table= document.getElementById("resume");
        
        //Nationalité
        if(tun.checked){
            var cin=document.getElementById("cin").value;
            var tun_html=document.createElement("tr");
            tun_html.innerHTML=
            `<td colspan="3">Nationalité: <strong>Tunisienne</strong></td>
            <td colspan="3">Cin: <strong>${cin}</strong></td>`;
            document.getElementById("naissance").after(tun_html);
        }else if(autre.checked){
            var passeport=document.getElementById("passeport").value;
            var pays=document.getElementById("pays").value;
            var autre_html=document.createElement("tr");
            autre_html.innerHTML=
            `<td colspan="3">Pays: <strong>${pays}</strong></td>
            <td colspan="3">N° de passeport: <strong>${passeport}</strong>`;
            document.getElementById("naissance").after(autre_html);
        }

        var tr_vide=document.createElement("tr");
        tr_vide.id="civ_mili"
        in_table.appendChild(tr_vide);

        //Les champs optionnels
        if(civ!=="Choix"){
            var civ_html=document.createElement("td");
            civ_html.setAttribute("colspan","3")
            civ_html.innerHTML=
            `Etat civil: <strong>${civ}</strong>`;
            document.getElementById("civ_mili").appendChild(civ_html);
        }
        if(situa!=="Choix"){
            var situa_html=document.createElement("td");
            situa_html.setAttribute("colspan","3")
            situa_html.innerHTML=
            `Situation militaire: <strong>${situa}</strong>`;
            document.getElementById("civ_mili").appendChild(situa_html);
        }

        //Niveau d'étude
        tr_vide=document.createElement("tr");
        tr_vide.id="nv_et";
        tr_vide.innerHTML=`<th colspan="6">Niveau d'étude</th>`;
        in_table.appendChild(tr_vide);
        var bac=document.getElementById("Annee bac");
        var sect=document.getElementById("Section").options[document.getElementById("Section").selectedIndex];
        var ment=document.getElementById("Mention").options[document.getElementById("Mention").selectedIndex];
        var sess=document.getElementById("Session").options[document.getElementById("Session").selectedIndex];
        var etab=document.getElementById("etablissement");
        var fil=document.getElementById("filiere");
        
        tr_vide=document.createElement("tr");
        tr_vide.id="anbac_sec"
        tr_vide.innerHTML=`<td colspan="3">Année du bac: <strong>${bac.value}</strong></td>
        <td colspan="3">Section: <strong>${sect.textContent}</strong></td>`;
        in_table.appendChild(tr_vide);

        tr_vide=document.createElement("tr");
        tr_vide.id="men_sess"
        tr_vide.innerHTML=`<td colspan="3">Mention: <strong>${ment.textContent}</strong></td>
        <td colspan="3">Session: <strong>${sess.textContent}</strong></td>`;
        in_table.appendChild(tr_vide);

        tr_vide=document.createElement("tr");
        tr_vide.id="etab_fil"
        tr_vide.innerHTML=`<td colspan="4" id="etab_ac_c">Établissement d'étude actuel: <strong>${etab.value}</strong></td>
        <td colspan="2">Filière: <strong>${fil.value}</strong></td>`;
        in_table.appendChild(tr_vide);
        
        //Address
        tr_vide=document.createElement("tr");
        tr_vide.id="Address";
        tr_vide.innerHTML=`<th colspan="6">Address</th>`;
        in_table.appendChild(tr_vide);

        var rue=document.getElementById("rue");
        var Ville=document.getElementById("Ville");
        var postal=document.getElementById("postal");
        var Gouvernaorat=document.getElementById("gouvernorat").options[document.getElementById("gouvernorat").selectedIndex];
        var telephone=document.getElementById("telephone");
        var Profession=document.getElementById("Profession");
        var etablissement=document.getElementById("etablissement_p");
        var mail=document.getElementById("mail");

        tr_vide=document.createElement("tr");
        tr_vide.id="r_v_p"
        tr_vide.innerHTML=`<td colspan="2">Rue : <strong>${rue.value}</strong></td>
        <td colspan="2">Ville: <strong>${Ville.value}</strong></td>
        <td colspan="2">Code postal: <strong>${postal.value}</strong></td>`;
        in_table.appendChild(tr_vide);

        tr_vide=document.createElement("tr");
        tr_vide.id="g"
        tr_vide.innerHTML=`<td colspan="6">Gouvernorat: <strong>${Gouvernaorat.innerText}</strong></td>`;
        in_table.appendChild(tr_vide);

        //Les champs optionnels
        tr_vide=document.createElement("tr");
        tr_vide.id="p_e"
        in_table.appendChild(tr_vide);
        if(Profession.value!==""){
            document.getElementById("p_e").innerHTML+=
            `<td colspan="3">Profession: <strong>${Profession.value}</strong></td>`;
        }
        if(etablissement.value!==""){
            document.getElementById("p_e").innerHTML+=
            `<td colspan="3" >Etablissement: <strong>${etablissement.value}</strong></td>`;
        }

        tr_vide=document.createElement("tr");
        tr_vide.id="m_t"
        tr_vide.innerHTML=`<td colspan="3">Téléphone: <strong>${telephone.value}</strong></td>
        <td colspan="3">E-mail: <strong>${mail.value}</strong></td>`;
        in_table.appendChild(tr_vide);

        //bouton de validation
        if(document.getElementById("conf")===null){
            var sub=document.createElement("input");
            sub.id="conf";
            sub.className="styled";
            sub.setAttribute("type","button");
            sub.setAttribute("value","Confirmer");
            document.body.appendChild(sub);
        }
        
        document.getElementsByClassName("styled")[0].addEventListener("click",function (){
            document.getElementById("myformulaire").submit();
            window.location.reload();
        }
            );

        //Table style
        sty.innerHTML+=`
        th{
            border-radius: 7px;
            background-color: #2bbd80;
            letter-spacing: 1px;
            color:white;
        }
        th,td{
            width: 16%;
            height: 35px;
            font-family:Arial, Helvetica, sans-serif;
        }
        #titre_res{
            color:Blue;
        }
        .styled {
            border: 0;
            line-height: 2.5;
            padding: 0 20px;
            font-size: 1rem;
            text-align: center;
            color: #fff;
            text-shadow: 1px 1px 1px #000;
            border-radius: 10px;
            background-color: rgba(0, 0, 200, 1);
            background-image: linear-gradient(to top left,
                                              rgba(0, 0, 0, .2),
                                              rgba(0, 0, 0, .2) 30%,
                                              rgba(0, 0, 0, 0));
            box-shadow: inset 2px 2px 3px rgba(255, 255, 255, .6),
                        inset -2px -2px 3px rgba(0, 0, 0, .6);
            margin:0 0 0 40%;
        }
        
        .styled:hover {
            background-color: rgba(0, 0, 255, 1);
        }
        
        .styled:active {
            box-shadow: inset -2px -2px 3px rgba(255, 255, 255, .6),
                        inset 2px 2px 3px rgba(0, 0, 0, .6);
        }        
        `;
        //Aller au resumé
        if(document.getElementById("page_bottom")===null){
            var page_bottom = document.createElement("a");
            page_bottom.id="page_bottom";
            page_bottom.setAttribute("href","#resume");
            document.body.appendChild(page_bottom);
        }
        document.getElementById("page_bottom").click();
    }else{
        if(document.getElementById("checkDiv")!==null){
            document.body.removeChild(document.getElementById("checkDiv"));
        }
    }
    document.head.appendChild(sty);
}

//Bouton Radio Tunisienne nationalité
document.getElementById("n_box1").onclick = function() {
    if(document.getElementById("box2")!==null){
        document.getElementById("box2").remove();
        document.getElementById("box2_2").remove();
    }
    if(document.getElementById("box1")===null){
        var lb = document.createElement("label");
        lb.id="lb_cin";
        lb.setAttribute("for","cin")
        lb.innerHTML="N° cin:<br><br>"
        var cin= document.createElement("input");
        cin.setAttribute("type","number")
        cin.id="cin";
        cin.setAttribute("name","cin");
        cin.setAttribute("placeholder","N° cin");
        row= document.createElement("tr");
        row.id="box1";
        col1= document.createElement("td");
        col1.appendChild(lb);
        col2= document.createElement("td");
        col2.appendChild(cin);
        row.appendChild(col1);
        row.appendChild(col2);
        col2.innerHTML+="&nbsp;<font color=\"FF0000\">*</font><br><br>"
        document.getElementById("nationalite").after(row);
    }

}

//Bouton Radio Autre nationalité
document.getElementById("n_box2").onclick = function() {
    if(document.getElementById("box1")!==null){document.getElementById("box1").remove()}
    if(document.getElementById("box2")===null){
        var lb = document.createElement("label");
        lb.id="lb_p";
        lb.setAttribute("for","lb_p")
        lb.innerHTML="Pays:<br><br>"
        var pays= document.createElement("input");
        pays.setAttribute("type","text")
        pays.id="pays";
        pays.setAttribute("name","pays");
        pays.setAttribute("placeholder","pays");
        row= document.createElement("tr");
        row.id="box2";
        col1= document.createElement("td");
        col1.appendChild(lb);
        col2= document.createElement("td");
        col2.appendChild(pays);
        row.appendChild(col1);
        row.appendChild(col2);
        col2.innerHTML+="&nbsp;<font color=\"FF0000\">*</font><br><br>"
        document.getElementById("nationalite").after(row);
        
        var lb = document.createElement("label");
        lb.id="lb_pas";
        lb.setAttribute("for","lb_pas")
        lb.innerHTML="N° de passeport:<br><br>"
        var pass= document.createElement("input");
        pass.setAttribute("type","number")
        pass.id="passeport";
        pass.setAttribute("name","passeport");
        pass.setAttribute("placeholder","N° de passeport");
        row= document.createElement("tr");
        row.id="box2_2";
        col1= document.createElement("td");
        col1.appendChild(lb);
        col2= document.createElement("td");
        col2.appendChild(pass);
        row.appendChild(col1);
        row.appendChild(col2);
        col2.innerHTML+="&nbsp;<font color=\"FF0000\">*</font><br><br>"
        document.getElementById("box2").after(row);
    }
}