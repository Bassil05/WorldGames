import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VendorService {
  private vendors: any;

  constructor() { 
    this.vendors = {
        "1": "NetEnt",
        "2": "Playtech",
        "3": "Ainsworth",
        "4": "Aristocrat",
        "5": "Amatic",
        "6": "Novomatic",
        "7": "Gaminator",
        "8": "Greentube",
        "9": "Igrosoft",
        "10": "Wazdan",
        "11": "Igt",
        "12": "QuickSpin",
        "13": "Evolution",
        "14": "Betgames",
        "15": "Ezugi",
        "16": "Hollywoodtv",
        "17": "Asiagaming",
        "18": "Gameart",
        "19": "BetSoft",
        "20": "Pragmatic Play",
        "21": "iSoftBet",
        "22": "Merkur",
        "23": "SportsBook",
        "25": "Leap Virtual",
        "26": "Vela Gaming",
        "27": "Vela Gaming Live Casino",
        "28": "Vela Gaming Virtual Games",
        "29": "FlashBetGaming",
        "30": "Endorphina",
        "31": "Fugaso",
        "32": "EvoPlay",
        "34": "Xplosive",
        "35": "Reeltime",
        "36": "Ganapati",
        "37": "Kiron",
        "38": "Habanero",
        "39": "Virtualgeneration",
        "40": "OneTouch",
        "41": "SlotMotion",
        "42": "Iron Dog",
        "43": "cq9",
        "45": "Lotto",
        "46": "PlayHub",
        "48": "Red Rake Gaming",
        "49": "RedRake Gaming Virtual ",
        "50": "BGaming",
        "51": "Belatra",
        "52": "MrSlotty",
        "53": "Platipus",
        "54": "Spinomenal",
        "56": "CT Interactive ",
        "57": "VivoGaming",
        "58": "Booming Games",
        "59": "Betixon",
        "60": "Playson",
        "61": "1X2 Gaming",
        "62": "ORYX",
        "63": "Felt Gaming",
        "64": "Nolimit City",
        "65": "Golden Hero",
        "66": "Gamomat",
        "67": "Kalamba",
        "68": "Givme",
        "69": "(test do not use)Mini Games",
        "70": "XLive",
        "71": "Play'n GO",
        "72": "PG Soft",
        "73": "Push Gaming",
        "74": "Tom Horn",
        "75": "Playson-",
        "76": "Charismatic",
        "77": "XLive Terminal",
        "78": "Keno Terminal",
        "79": "Poker Terminal",
        "80": "Shootout Terminal",
        "81": "SpaceBallSeven Terminal",
        "82": "Sports Terminal",
        "83": "Xraces Terminal",
        "84": "EGT",
        "85": "Microgaming",
        "86": "Apollo Play",
        "87": "Slotvision",
        "88": "LiveGames",
        "89": "Red Tiger",
        "90": "PariPlay",
        "91": "LuckyStreak",
        "92": "Edict",
        "93": "Booongo",
        "94": "Patagonia",
        "95": "Authentic Gaming",
        "96": "WeAreCasino",
        "97": "Medialive",
        "98": "XProGaming",
        "99": "Spigo",
        "100": "WorldMatch",
        "101": "AsiaLiveTech",
        "102": "BigTimeGaming",
        "103": "Spinmatic",
        "104": "SmartSoft",
        "105": "Mascot",
        "106": "August Gaming",
        "107": "MiniGames",
        "108": "Thunderkick",
        "109": "Hacksaw Gaming",
        "110": "Blueprint Gaming",
        "111": "2BY2 Gaming",
        "112": "ELK Studios",
        "113": "All41 Studios",
        "114": "Bla Bla Bla Studios\r\n",
        "115": "Crazy Tooth Studio",
        "116": "Cubix",
        "117": "Electric Elephant",
        "118": "Foxium",
        "119": "Gameburger Studios",
        "120": "Gamevy",
        "121": "Genesis Gaming",
        "122": "Eurasian Gaming",
        "123": "JFTW",
        "124": "Kwikiwin Studio",
        "125": "Lightning Box",
        "126": "Neon Valley",
        "127": "eBet",
        "128": "OLDSkullz",
        "129": "Plank Gaming",
        "130": "Pulse 8 Studios",
        "131": "Rabcat",
        "132": "Realistic",
        "133": "Skillzz Gaming",
        "134": "Sling Shot Studios",
        "135": "Stormcraft Studio",
        "136": "Switch Studios",
        "137": "Triple Edge Studio",
        "138": "Fantasma Games",
        "139": "Fortune Factory Studios",
        "140": "Golden Rock Studio",
        "141": "Sa gaming",
        "142": "Relax-Gaming",
        "143": "Genii",
        "144": "Leander",
        "145": "Spearhead Studios",
        "146": "Thunderspin",
        "147": "Betradar Virtuals",
        "148": "Golden Race",
        "149": "BB Games",
        "150": "Boomerang",
        "151": "Chance Interactive",
        "152": "Gamefish Global",
        "153": "Games Lab",
        "154": "Mobilots",
        "155": "OMI Gaming",
        "156": "Realtime Gaming",
        "157": "Revolver Gaming",
        "158": "Slotmill",
        "159": "Splitrock Gaming",
        "160": "Woohoo Games",
        "161": "Yggdrasil",
        "162": "Fazi",
        "163": "Gamshy",
        "164": "Netgame",
        "165": "PlayPearls",
        "166": "Slotexchange",
        "167": "Spadegaming",
        "168": "TrueLab",
        "169": "Betsolutions",
        "170": " Caleta Gaming",
        "171": "EA Bingo",
        "172": "Triple PG",
        "173": "Konect",
        "174": "Salsa",
        "175": "Peter&Sons",
        "176": "Slingo",
        "177": "Noble",
        "178": "Bomba",
        "179": "racing",
        "180": "ReelNRG",
        "181": "Stakelogic",
        "182": "GreenJade",
        "183": "Gamzix",
        "184": "Mancala Gaming",
        "185": "7Mojos",
        "186": "Lady Luck",
        "187": "G.Games",
        "188": "High5",
        "189": "Arcadem",
        "190": "EvolutionMGA",
        "191": "Swintt",
        "192": "Blue Guru",
        "193": "Atomic Slot Lab",
        "194": "Onyxion games",
        "195": "LambdaGaming",
        "196": "Bluberi",
        "197": "Onlyplay",
        "198": "Gamzix",
        "199": "Spribe",
        "200": "gamino",
        "201": "Felix Gaming",
        "202": "Vibra Gaming",
        "203": "Evolution2",
        "204": "Dummy Vendor",
        "205": "Orbital  Gaming",
        "206": "Slotopia ",
        "207": "EGT Digital",
        "208": "PatePlay",
        "209": "Pragmatic Play 2",
        "210": "BeeFee",
        "211": "SportsBookSportToto",
        "212": "UpGamingGameAggregator",
        "213": "CelestiumVision",
        "214": "Backseat Gaming",
        "215": "ParlayBay",
        "216": "Jili Asia",
        "217": "KA Gaming",
        "218": "GA28"
      }
    }

    getVendors(): {string: string} {
    return this.vendors;
    }
}