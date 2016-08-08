//name, skin, rarity, collection, minFloat, maxFloat, statTrak, souvenir, gun, price
//price = {[fn,mw,ft,ww,bs],[stfn,stmw,stft,stww,stbs]}
skins = {};

//Gamma Case skins
var glock_wasteland_rebel = new Skin("glock_wasteland_rebel", "Wasteland Rebel", 5, "gamma_case", 0.54, 0.0, true, false, "Glock-18", "graphics/gamma/glock_wasteland_rebel.png", [[26.81,22.83,19.86,18.57,15.48],[123.26,116.32,56.51,79.45,90.17]]);
var m4a1s_mecha_industries = new Skin("m4a1-s_mecha_industries", "Mecha Industries", 5, "gamma_case", 0.80, 0.0, true, false, "M4A1-S", "graphics/gamma/m4a1s_mecha_industries.png", [[57.27,36.98,25.06,33.78,18,93],[352,89,131.37,78.91,null,56.6]]);
var m4a4_desolate_space = new Skin("m4a4_desolate_space", "Desolate Space", 4, "gamma_case", 1.0, 0.0, true, false, "M4A4", "graphics/gamma/m4a4_desolate_space.png", [[61.67,35.69,28.63,22.90,17.73],[223.33,102.60,74.50,62.76,48.59]]);
var scar20_bloodsport = new Skin("scar-20_bloodsport", "Bloodsport", 4, "gamma_case", 0.45, 0.0, true, false, "SCAR-20", "graphics/gamma/scar20_bloodsport.png", [[3.77,3.35,2.43,3.02,"NaN"],[18.93,10.61,7.89,9.79,"NaN"]]);
var p2000_imperial_dragon = new Skin("p2000_imperial_dragon", "Imperial Dragon", 4, "gamma_case", 0.63, 0.0, true, false, "P2000", "graphics/gamma/p2000_imperial_dragon.png", [[7.28,3.99,2.92,3.06,3.73],[29.56,19.58,13.08,15.57,18.66]]);
var awp_phobos = new Skin("awp-phobos", "Phobos", 3, "gamma_case", 0.40, 0.0, true, false, "AWP", "graphics/gamma/awp_phobos.png", [[5.96,4.58,4.47,5.62,"NaN"],[19.92,16.94,15.0,16.19,"NaN"]]);
var aug_aristocrat = new Skin("aug_aristocrat", "Aristocrat", 3, "gamma_case", 0.66, 0.0, true, false, "AUG", "graphics/gamma/aug_aristocrat.png", [[2.87,1.68,1.07,1.28,1.20],[9.86,4.89,3.83,3.90,3.23]]);
var p90_chopper = new Skin("p90_chopper", "Chopper", 3, "gamma_case", 0.60, 0.0, true, false, "P90", "graphics/gamma/p90_chopper.png", [[3.11,2.10,1.38,1.77,1.38],[11.69,6.68,4.50,5.13,4.13]]);
var sawedoff_limelight = new Skin("sawed-off_limelight", "Limelight", 3, "gamma_case", 1.0, 0.0, true, false, "Sawed-Off", "graphics/gamma/sawedoff_limelight.png", [[3.48,1.83,1.29,1.07,1.17],[11.68,5.13,3.97,2.69,3.32]]);
var r8_revolver_reboot = new Skin("r8_revolver_reboot", "Reboot", 3, "gamma_case", 1.0, 0.0, true, false, "R8 Revolver", "graphics/gamma/r8_revolver_reboot.png", [[4.94,1.61,1.24,1.10,1.03],[20.46,5.03,3.87,2.97,3.18]]);
var fiveseven_violent_daimyo = new Skin("five-seven_violent_daimyo", "Violent Daimyo", 2, "gamma_case", 0.70, 0.0, true, false, "Five-SeveN", "graphics/gamma/fiveseven_violent_daimyo.png", [[1.70,0.89,0.51,0.73,0.38],[7.0,3.49,1.88,2.45,1.55]]);
var mac10_carnivore = new Skin("mac-10_carnivore", "Carnivore", 2, "gamma_case", 1.0, 0.0, true, false, "MAC-10", "graphics/gamma/mac10_carnivore.png", [[0.47,0.23,0.18,0.17,0.17],[1.89,0.75,0.55,0.57,0.49]]);
var nova_exo = new Skin("nova_exo", "Exo", 2, "gamma_case", 0.50, 0.0, true, false, "Nova", "graphics/gamma/nova_exo.png", [[0.35,0.24,0.17,0.20,0.18],[1.60,0.39,0.51,0.99,0.57]]);
var p250_iron_clad = new Skin("p250_iron_clad", "Iron Clad", 2, "gamma_case", 0.80, 0.05, true, false, "P250", "graphics/gamma/p250_iron_clad.png", [[0.75,0.22,0.17,0.18,0.17],[4.80,0.82,0.62,0.64,0.52]]);
var ppbizon_harvester = new Skin("pp-bizon_harvester", "Harvester", 2, "gamma_case", 1.0, 0.0, true, false, "PP-Bizon", "graphics/gamma/ppbizon_harvester.png", [[0.41,0.26,0.17,0.17,0.17],[1.77,0.69,0.53,0.53,0.44]]);
var tec9_ice_cap = new Skin("tec-9_ice_cap", "Ice Cap", 2, "gamma_case", 0.50, 0.0, true, false, "Tec-9", "graphics/gamma/tec9_ice_cap.png", [[0.73,0.55,0.21,0.28,0.20],[3.47,2.29,1.24,1.27,0.99]]);
var sg_553_aerial = new Skin("sg_553_aerial", "Aerial", 2, "gamma_case", 0.60, 0.0, true, false, "SG 553", "graphics/gamma/sg_553_aerial.png", [[0.59,0.35,0.18,0.23,0.17],[3.41,1.48,0.68,1.25,0.84]]);

//Gamma Case
var gamma_case = new Case("gamma_case", 2.50, "Gamma case", "gamma_key", "graphics/gamma/gamma_case.png", "graphics/gamma/gamma_logo.png", "gamma",
[glock_wasteland_rebel,m4a1s_mecha_industries,m4a4_desolate_space,scar20_bloodsport,
p2000_imperial_dragon,awp_phobos,aug_aristocrat,p90_chopper,sawedoff_limelight,
r8_revolver_reboot,fiveseven_violent_daimyo,mac10_carnivore,nova_exo,p250_iron_clad,
ppbizon_harvester,tec9_ice_cap,sg_553_aerial]);
var gamma_key = new Key("gamma_key",  2.50, "gamma", "Gamma case key", "graphics/gamma/gamma_key.png")