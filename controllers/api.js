const fetch = require('node-fetch');
const fs = require('fs');
const CSV=require("csv-string");

const allStatutUpdate = ['stat_max_health', 'stat_damage', 'power_attack_decrease',
    'power_damage', 'power_duration', 'power_unlock', 'power_attack_boost', 'power_range',
    'power_summon_level', 'power_max_hp_gain', 'power_poison', 'power_heal', 'power_hero_damage',
    'power_max_hp_loss', 'power_target'];

exports.cardsToCSV=()=>{
    const headers = {'Content-Type':'application/json' };
  fetch("https://sppd.feinwaru.com/api/v1/cards/list",{method: 'GET',headers:headers})
      .then(reponse=>{return reponse.json()})
      .then(json=>{
      const data = json.data;
      let text = "id;name;image;updated_at\n"
      for(let i=0;i<data.length;i++)
      {
          text+=data[i]._id+";"+data[i].name+";"+data[i].image+";"+data[i].updated_at+"\n";
      }

      try {
          fs.writeFile("./allcards.csv",text,()=>{
              return json;
          });
      } catch (err) {
          console.error(err)
      }
  })
};

/**
 *  Deal with tech_tree to give value depending of the tree
 *  JUST FOR CHARACTERS
 * @param card a card
 */
exports.linkBetweenLevelAndUpdate = (card) => {
    const name = card.name;
    const tech_tree = card.tech_tree;
    const slots = tech_tree.slots;
    const levels = tech_tree.levels;
    let health = parseInt(card.health);
    let damage = parseInt(card.damage);
    const powerArray = card.powers;
    const index=[(0,4),(4,14),(14,24),(24,39),(39,54),(54,69)];

    let text = "LevelName;Health;Damage;OtherPower\n";
    if(powerArray.length == 0) {
        text += "Level 1;" + health + ";" + damage + ";\n";
        for(let j = 0; j < 6; j++) {
            if(slots.length != 0) {
                for(let i = index[j][0]; i < index[j][1]; i++) {
                    const property = slots[i].property;
                    if(property == "stat_max_health") {
                        health += parseInt(slots[i].value);
                    } else if (property == "stat_damage") {
                        damage += parseInt(slots[i].value);
                    }
                    text += "Upgrade " + (i+2) + "/70;" + health + ";" + damage +";\n";
                }
            }
            const level2 = levels[j].slots;
            for(let i = 0;i < level2.length; i++) {
                if(level2[i].property == "stat_max_health") {
                    health += parseInt(level2[i].value);
                } else if (level2[i].property == "stat_damage") {
                    damage += parseInt(level2[i].value);
                }
            }
            text += "Level " + (j+2) + ";" + health + ";" + damage + ";\n";
        }
    } else {
        text += "Level 1;" + health + ";" + damage + ";" + powerArray[0].type + "\n";
        for(let j = 0 ; j < 6; j++) {
            let powerString = "";
            if(slots.length != 0) {
                for (let i = index[j][0]; i < index[j][1]; i++) {
                    const property = slots[i].property;
                    if(property == "stat_max_health") {
                        health += parseInt(slots[i].value);
                    } else if(property == "stat_damage") {
                        damage += parseInt(slots[i].value);
                    } else {
                        powerString += property + "=" + slots[i].value;
                    }
                    text += "Upgrade " + (i+2) + "/70;" + health + ";" + damage + ";" + powerString + "\n";
                }
            }
            const level2 = levels[j].slots;
            for(let i = 0; i < level2.length; i++) {
                const property = level2[i].property;
                if (property == "stat_max_health") {
                    health += parseInt(level2[i].value);
                } else if (property == "stat_damage") {
                    damage += parseInt(level2[i].value);
                } else {
                    powerString += property + "=" + level2[i].value;
                }
            }
            text += "Level " + (j+2) + ";" + health + ";" + damage + ";\n";
        }
    }
    try {

        fs.mkdir('./LevelDetails', { recursive: true }, (err) => {
            if (err) {
                throw err
            } else {
                fs.writeFile("./LevelDetails/" + name + ".csv",text,() => {
                });
            }
        });

    } catch (err) {
        console.error(err)
    }

};

exports.dealWithAllCard=()=>{
    let csvText;
    try {
        csvText= fs.readFileSync('./allcards.csv', 'utf8')
    } catch (err) {
        console.error(err)
    }
    const arr = CSV.parse(csvText);
    const headers = {'Content-Type':'application/json' };
    for(let i=1;i<arr.length;i++)
    {
        const id = arr[i][0];
        fetch("https://sppd.feinwaru.com/api/v1/cards/"+id,{method : 'GET', headers:headers})
            .then(reponse => {return reponse.json()})
            .then(json=>{
                const data = json.data;
                this.linkBetweenLevelAndUpdate(data);
                this.dealwithACard(data);
            });
    }
}

exports.dealwithACard = (card) => {
    const name = card.name;
    const typeCard = card.type;
    const theme = card.theme;
    const mana = card.mana_cost;
    const characterType = card.character_type;
    const rarity = card.rarity;
    const maxVelocity = card.max_velocity;
    const time_to_reach_max_velocity = card.time_to_reach_max_velocity;
    const cast_area = card.cast_area;
    const attack_range = card.attack_range;
    const timeBetweenAttack = card.time_between_attacks;
    const powerArray = card.powers;
    let power1 = "";
    let power2 = "";
    if(powerArray.length == 1) {
        power1 = powerArray[0].type;
        power2 = "X";
    } else if (powerArray.length == 2) {
        power1 = powerArray[0].type;
        power2 = powerArray[1].type;
    } else {
        power1 = "X";
        power2 = "X";
    }
    const text = "Nom;Mana;Type de carte;Theme;Type de perso;Rareté;Range d'attaque;" +
        "Aire d'atteinte;Vitesse Maximal;Temps à atteindre la vitesse max;" +
        "Temps entre attaque;pouvoir 1; pouvoir 2\n" + name + ";" + mana + ";" + typeCard +
        ";" + theme + ";" + characterType + ";" + rarity + ";" + attack_range + ";" + cast_area +
        ";" + maxVelocity + ";" + time_to_reach_max_velocity + ";" + timeBetweenAttack + ";" +
        power1 + ";" + power2 + "\n";

    try {
        fs.mkdir('./DetailCard', { recursive: true }, (err) => {
            if (err) {
                throw err
            } else {
                fs.writeFile("./DetailCard/" + name + ".csv", text, () => {
                });
            }
        });
    } catch (err) {
        console.error(err)
    }
};