import{useState,useEffect,useRef,useCallback}from"react";
import{Smartphone,Clock,ChevronRight,RotateCcw,Check,X,AlertTriangle,Target,Zap,Home,BookOpen,Layers,Trophy,RefreshCw}from"lucide-react";

const RANKS=[
["Trainee I","Trainee 1",0,0],["Trainee II","Trainee 2",0,50],
["Private","Private",0,150],["Private First Class","Private First Class",0,300],
["Corporal","Corporal",1,500],
["Sergeant I","Sergeant 1",1,800],["Sergeant II","Sergeant 2",1,1150],["Sergeant III","Sergeant 3",1,1550],["Sergeant IV","Sergeant 4",1,2000],
["Staff Sergeant I","Staff Sergeant 1",2,2500],["Staff Sergeant II","Staff Sergeant 2",2,3050],["Staff Sergeant III","Staff Sergeant 3",2,3650],["Staff Sergeant IV","Staff Sergeant 4",2,4300],["Staff Sergeant V","Staff Sergeant 5",2,5000],["Staff Sergeant VI","Staff Sergeant 6",2,5750],
["Sergeant First Class I","Sergeant First Class 1",2,6550],["Sergeant First Class II","Sergeant First Class 2",2,7400],["Sergeant First Class III","Sergeant First Class 3",2,8300],["Sergeant First Class IV","Sergeant First Class 4",2,9250],["Sergeant First Class V","Sergeant First Class 5",2,10250],["Sergeant First Class VI","Sergeant First Class 6",2,11300],
["Master Sergeant I","Master Sergeant 1",2,12400],["Master Sergeant II","Master Sergeant 2",2,13550],["Master Sergeant III","Master Sergeant 3",2,14750],["Master Sergeant IV","Master Sergeant 4",2,16000],["Master Sergeant V","Master Sergeant 5",2,17300],["Master Sergeant VI","Master Sergeant 6",2,18650],
["Second Lieutenant I","Second Lieutenant 1",3,20050],["Second Lieutenant II","Second Lieutenant 2",3,21500],["Second Lieutenant III","Second Lieutenant 3",3,23000],["Second Lieutenant IV","Second Lieutenant 4",3,24550],["Second Lieutenant V","Second Lieutenant 5",3,26150],["Second Lieutenant VI","Second Lieutenant 6",3,27800],["Second Lieutenant VII","Second Lieutenant 7",3,29500],["Second Lieutenant VIII","Second Lieutenant 8",3,31250],
["First Lieutenant I","First Lieutenant 1",3,33050],["First Lieutenant II","First Lieutenant 2",3,34900],["First Lieutenant III","First Lieutenant 3",3,36800],["First Lieutenant IV","First Lieutenant 4",3,38750],["First Lieutenant V","First Lieutenant 5",3,40750],["First Lieutenant VI","First Lieutenant 6",3,42800],["First Lieutenant VII","First Lieutenant 7",3,44900],["First Lieutenant VIII","First Lieutenant 8",3,47050],
["Captain I","Captain 1",4,49250],["Captain II","Captain 2",4,51500],["Captain III","Captain 3",4,53800],["Captain IV","Captain 4",4,56150],["Captain V","Captain 5",4,58550],["Captain VI","Captain 6",4,61000],["Captain VII","Captain 7",4,63500],["Captain VIII","Captain 8",4,66050],
["Major I","Major 1",4,68650],["Major II","Major 2",4,71300],["Major III","Major 3",4,74000],["Major IV","Major 4",4,76750],["Major V","Major 5",4,79550],["Major VI","Major 6",4,82400],["Major VII","Major 7",4,85300],["Major VIII","Major 8",4,88250],
["Lieutenant Colonel I","Lieutenant Colonel 1",5,91250],["Lieutenant Colonel II","Lieutenant Colonel 2",5,94300],["Lieutenant Colonel III","Lieutenant Colonel 3",5,97400],["Lieutenant Colonel IV","Lieutenant Colonel 4",5,100550],["Lieutenant Colonel V","Lieutenant Colonel 5",5,103750],["Lieutenant Colonel VI","Lieutenant Colonel 6",5,107000],["Lieutenant Colonel VII","Lieutenant Colonel 7",5,110300],["Lieutenant Colonel VIII","Lieutenant Colonel 8",5,113650],
["Colonel I","Colonel 1",5,117050],["Colonel II","Colonel 2",5,120500],["Colonel III","Colonel 3",5,124000],["Colonel IV","Colonel 4",5,127550],["Colonel V","Colonel 5",5,131150],["Colonel VI","Colonel 6",5,134800],["Colonel VII","Colonel 7",5,138500],["Colonel VIII","Colonel 8",5,142250],
["Brigadier General I","Brigadier General 1",6,146050],["Brigadier General II","Brigadier General 2",6,149900],["Brigadier General III","Brigadier General 3",6,153800],["Brigadier General IV","Brigadier General 4",6,157750],["Brigadier General V","Brigadier General 5",6,161750],["Brigadier General VI","Brigadier General 6",6,165800],
["Major General I","Major General 1",6,169900],["Major General II","Major General 2",6,174050],["Major General III","Major General 3",6,178250],["Major General IV","Major General 4",6,182500],["Major General V","Major General 5",6,186800],["Major General VI","Major General 6",6,191150],
["Lieutenant General I","Lieutenant General 1",6,195550],["Lieutenant General II","Lieutenant General 2",6,200000],["Lieutenant General III","Lieutenant General 3",6,204500],["Lieutenant General IV","Lieutenant General 4",6,209050],["Lieutenant General V","Lieutenant General 5",6,213650],["Lieutenant General VI","Lieutenant General 6",6,218300],
["General I","General 1",6,223000],["General II","General 2",6,227750],["General III","General 3",6,232550],["General IV","General 4",6,237400],["General V","General 5",6,242300],
["Marshall","Marshall",7,247250],["Grand Marshall","Grand Marshall",7,252250],
];

const BASE="https://raw.githubusercontent.com/emorrison210/rank-icons/main/";
function rankImg(f){return BASE+encodeURIComponent(f)+".jpg";}
function getRankIdx(xp){for(let i=RANKS.length-1;i>=0;i--)if(xp>=RANKS[i][3])return i;return 0;}
function rColor(g){
  return[
    {card:"from-slate-600/20 to-slate-400/5 border-slate-500/30",badge:"#334155",txt:"text-slate-300"},
    {card:"from-green-800/20 to-green-600/5 border-green-700/30",badge:"#14532d",txt:"text-green-300"},
    {card:"from-emerald-800/20 to-teal-600/5 border-emerald-700/30",badge:"#064e3b",txt:"text-emerald-300"},
    {card:"from-blue-700/20 to-blue-500/5 border-blue-600/30",badge:"#1e3a8a",txt:"text-blue-300"},
    {card:"from-purple-700/20 to-purple-500/5 border-purple-600/30",badge:"#581c87",txt:"text-purple-300"},
    {card:"from-red-800/20 to-red-600/5 border-red-700/30",badge:"#7f1d1d",txt:"text-red-300"},
    {card:"from-yellow-700/20 to-amber-500/5 border-yellow-600/30",badge:"#78350f",txt:"text-yellow-300"},
    {card:"from-yellow-400/25 to-amber-300/5 border-yellow-300/50",badge:"#92400e",txt:"text-yellow-100"},
  ][g]||{card:"from-slate-600/20 to-slate-400/5 border-slate-500/30",badge:"#334155",txt:"text-slate-300"};
}
function rBar(g){
  return["linear-gradient(to right,#64748b,#94a3b8)","linear-gradient(to right,#16a34a,#4ade80)","linear-gradient(to right,#059669,#34d399)","linear-gradient(to right,#2563eb,#60a5fa)","linear-gradient(to right,#7c3aed,#a78bfa)","linear-gradient(to right,#dc2626,#f87171)","linear-gradient(to right,#d97706,#fbbf24)","linear-gradient(to right,#facc15,#fb923c)"][g]||"linear-gradient(to right,#64748b,#94a3b8)";
}

const Q=[
["Cellular","Standard LTE max download speed:",["50 Mbit/s","100 Mbit/s","150 Mbit/s","300 Mbit/s"],2,"LTE = 150 Mbit/s.","s"],
["Cellular","LTE-A max download speed:",["150 Mbit/s","200 Mbit/s","300 Mbit/s","1 Gbit/s"],2,"LTE-A = 300 Mbit/s, double standard LTE.","s"],
["Cellular","3G introduced in:",["1995","1998","2001","2005"],1,"3G launched in 1998.","s"],
["Cellular","5G launched worldwide in:",["2018","2019","2020","2022"],2,"5G worldwide launch = 2020.","s"],
["Cellular","5G top speed at higher frequencies:",["1 Gbit/s","5 Gbit/s","10 Gbit/s","50 Gbit/s"],2,"High-frequency 5G = up to 10 Gbit/s.","s"],
["Cellular","Lower-frequency 5G range:",["10-50 Mbit/s","100-900 Mbit/s","1-5 Gbit/s","50 Mbit/s fixed"],1,"Low-frequency 5G = 100-900 Mbit/s.","s"],
["Cellular","Airplane Mode disables:",["Only cellular data","Only voice calls","All cellular radios","All radios permanently"],2,"Airplane mode = all cellular radios off; WiFi/BT can re-enable.","g"],
["Cellular","Voice and data on a cellular device can be:",["Only toggled together","Enabled or disabled independently","Never disabled","Only via airplane mode"],1,"Voice and data can often be toggled independently.","g"],
["Cellular","LTE is based on:",["CDMA and TDMA","GSM and EDGE","WiFi and Bluetooth","NFC and RFID"],1,"LTE builds on GSM and EDGE.",""],
["Cellular","5G biggest benefit for IoT:",["Eliminates SIM cards","More bandwidth for larger data and cloud processing","Removes GPS dependency","Replaces Bluetooth"],1,"5G enables larger IoT data and more cloud processing.",""],
["WiFi/Hotspot","WiFi calling requires:",["Just an active WiFi connection","Carrier support","A 5G phone","A physical SIM"],1,"WiFi calling needs carrier support — not just WiFi.","g"],
["WiFi/Hotspot","Hotspot availability depends on:",["Phone screen size","Phone type and carrier plan","Installed apps","Router brand"],1,"Hotspot availability and cost depend on phone and carrier plan.","g"],
["WiFi/Hotspot","Compared to cellular, WiFi generally offers:",["Lower speeds, unlimited range","Higher speeds, needs access point, limited range","Same speed","No advantage"],1,"WiFi = higher speeds but needs a nearby access point.",""],
["WiFi/Hotspot","Using your phone as a hotspot may:",["Always be free","Incur extra charges depending on plan","Disable cellular","Require a SIM swap"],1,"Hotspot use can cost extra depending on the carrier plan.","g"],
["SIM","Replacing a physical SIM typically:",["Has no effect","Changes the phone number","Erases apps","Disables WiFi"],1,"SIM stores the phone number — swapping it changes the number.",""],
["SIM","Physical SIM vs eSIM:",["eSIM is removable; SIM is not","SIM is removable; eSIM is embedded","They are identical","eSIM only works on 5G"],1,"Physical SIM = removable; eSIM = embedded permanently.","g"],
["SIM","A device without a SIM tray can still use cellular via:",["NFC","eSIM","TRRS","M.2"],1,"eSIM is built directly into the device.",""],
["SIM","A physical SIM does NOT store:",["SIM ID and phone number","Cellular network info","Limited contacts","Full photo library"],3,"SIMs store identity/network info — not large data like photos.",""],
["SIM","Modern phones may support:",["Only one SIM","Multiple SIMs at once","No SIM","Bluetooth SIM emulation"],1,"Many devices support physical SIM + eSIM simultaneously.",""],
["Bluetooth","Bluetooth network type:",["LAN","WAN","PAN","MAN"],2,"Bluetooth = Personal Area Network (PAN).","s"],
["Bluetooth","Bluetooth effective range:",["4 cm","10 meters","1 km","Unlimited"],1,"Bluetooth = ~10 meters.","s"],
["Bluetooth","Bluetooth pairing relies on:",["Username/password","A PIN matched on both devices","An IP address","A fingerprint"],1,"Bluetooth pairing uses a matching PIN.",""],
["Bluetooth","After initial pairing, future BT connections:",["Need full re-pairing","Reconnect automatically","Need PIN every time","Last 24 hours only"],1,"Devices reconnect automatically after first pair.",""],
["GPS","GPS minimum satellites needed for precise fix:",["2","3","4","6"],2,"At least 4 satellites needed for precise GPS.","s"],
["GPS","GPS satellites currently in orbit:",["~12","~24","Over 30","Over 200"],2,"Over 30 GPS satellites orbit Earth.","s"],
["GPS","GPS was created by:",["NASA","A private company","The U.S. Dept of Defense","The FCC"],2,"GPS = U.S. Department of Defense.",""],
["GPS","Indoors, mobile location improves by adding:",["NFC and TRRS","WiFi and cellular tower data","SIM serial numbers","BT history"],1,"Mobile location = GPS + WiFi + cellular towers combined.",""],
["MDM","MDM is best described as:",["A cellular network type","Centralized management of mobile devices","A charging protocol","An auth factor"],1,"MDM centrally manages and secures mobile devices.",""],
["MDM","MDM can control a partition to:",["Wipe the whole device","Manage only work content, leaving personal data alone","Disable all radios","Reset the SIM"],1,"MDM partition manages only the work section of the device.",""],
["MDM","Corporate email via MDM means the user:",["Must enter server settings manually","Needs no manual setup — MDM pushes settings","Must call IT each time","Needs a separate SIM"],1,"MDM auto-configures email server and protocol.",""],
["MDM","Full device MDM vs partition control:",["Identical","Full = entire device; partition = separated managed section","Partition = corporate only","Full = tablets only"],1,"MDM can manage the whole device or just a partition.","g"],
["Ownership","BYOD means:",["Company owns and controls device","Employee owns device; must meet requirements","Employee picks from approved list","Device wiped after use"],1,"BYOD = employee-owned, harder to secure.",""],
["Ownership","COPE stands for:",["Company owns, full IT control, personal use allowed","Employee owns fully","Choose Your Own Device","No IT control"],0,"COPE = Corporate Owned, Personally Enabled.","g"],
["Ownership","CYOD differs from COPE in that:",["CYOD is employee-owned","CYOD lets employee pick model from approved list","CYOD has no IT control","CYOD = tablets only"],1,"CYOD = company-owned; employee selects the model.","g"],
["Ownership","BYOD → CYOD → COPE ranked by IT control, least to most:",["BYOD then CYOD then COPE","COPE then CYOD then BYOD","CYOD then BYOD then COPE","BYOD then COPE then CYOD"],0,"BYOD = least IT control; COPE = most IT control.","g"],
["Sync","Mobile sync covers all EXCEPT:",["Calendar","Contacts","Business app data","Full call history"],3,"Sync = calendar, contacts, business app data.",""],
["Battery","Modern laptop batteries use:",["NiCd and NiMH","Li-ion and LiPo","Alkaline cells","Lead-acid"],1,"Modern laptops = Li-ion and LiPo.",""],
["Battery","Li-ion and LiPo have no memory effect, unlike:",["SSD storage","NiCd batteries","SATA drives","SO-DIMM modules"],1,"The memory effect was a flaw in NiCd batteries.",""],
["Keyboard/RAM","Laptop RAM uses which form factor?",["DIMM","SO-DIMM","M.2","SATA"],1,"Laptops use SO-DIMM modules.",""],
["Keyboard/RAM","Soldered RAM that fails requires:",["RAM module swap","Full motherboard replacement","BIOS update","USB RAM expander"],1,"Soldered RAM failure = motherboard replacement.","g"],
["Keyboard/RAM","If the laptop keyboard fails, quick workaround:",["Replace motherboard","External USB keyboard","Reinstall OS","Use only trackpad"],1,"External USB keyboard = fastest temporary fix.",""],
["Storage","Laptop HDD vs desktop form factor:",["2.5in laptop / 3.5in desktop","3.5in laptop / 2.5in desktop","Both 3.5in","Both M.2"],0,"Laptops = 2.5in; desktops = 3.5in.","s"],
["Storage","M.2 SSD vs 2.5in SSD key difference:",["M.2 is smaller, no SATA cables; 2.5in uses SATA","M.2 is slower","2.5in needs no screws","M.2 for desktops only"],0,"M.2 = compact, no SATA cables; 2.5in = SATA connections.","g"],
["Storage","M.2 SSD installs with how many screws?",["None","1","2","4"],1,"M.2 = 1 screw.","s"],
["Storage","2.5in drive installs with how many screws?",["1","2","4","No screws"],1,"2.5in = 2 screws.","s"],
["Storage","To migrate to SSD without reinstalling the OS:",["Fresh OS install","Clone or image the old drive","Copy only documents","Reformat first"],1,"Cloning preserves all data and apps without OS reinstall.",""],
["Wireless HW","802.11 is LAN; Bluetooth is:",["Also LAN","PAN","WAN","MAN"],1,"WiFi = LAN; Bluetooth = PAN.","g"],
["NFC","NFC effective range:",["4 cm or less","1 meter","10 meters","50 meters"],0,"NFC = ~4 cm range.","s"],
["NFC","NFC vs Bluetooth range:",["NFC 10m, BT 4cm","NFC 4cm, BT 10m","Both 10m","Both 4cm"],1,"NFC ~4 cm; Bluetooth ~10 m.","gs"],
["NFC","Tapping a phone to pay at a store uses:",["GPS","NFC","M.2","TRRS"],1,"Contactless payments = NFC.",""],
["Biometrics/Camera","Biometric auth requires:",["Hardware only","OS config only","Both hardware and OS config","Neither"],2,"Biometrics need both hardware and OS configuration.","g"],
["Biometrics/Camera","Biometric auth falls under:",["Something you know","Something you have","Something you are","Somewhere you are"],2,"Biometrics = something you are.",""],
["USB/Lightning","USB-C pin count:",["8","12","24","30"],2,"USB-C = 24-pin, reversible.","s"],
["USB/Lightning","Lightning pin count:",["6","8","12","24"],1,"Lightning = 8-pin, Apple-only.","s"],
["USB/Lightning","USB-C is best described as:",["Guarantees USB 4 speed","A connector shape; speed depends on USB version","Apple-only","Charging only"],1,"USB-C = connector shape, not a speed guarantee.","g"],
["USB/Lightning","Lightning is used by:",["All Android phones","Apple devices only","Most Windows laptops","All USB-IF devices"],1,"Lightning = Apple-proprietary only.","g"],
["Accessories","Standard wired headset jack:",["2.5mm TRS","3.5mm TRRS","USB-A only","RCA"],1,"Wired headset = 3.5mm TRRS jack.","s"],
["Docking","Docking station vs port replicator:",["Docking stations are smaller","Docking station adds new functionality; port replicator only duplicates existing ports","Port replicators support more monitors","No real difference"],1,"Docking station = adds new; port replicator = duplicates existing.","g"],
["Acronyms","SO-DIMM stands for:",["Small Outline Dual In-line Memory Module","Standard Output Data Module","Single Operation Dual Interface","Small Onboard Direct Memory"],0,"SO-DIMM = Small Outline Dual In-line Memory Module.","a"],
["Acronyms","LTE stands for:",["Long Term Evolution","Last Tower Edge","Long Transfer Encoding","Linked Telecom Exchange"],0,"LTE = Long Term Evolution.","a"],
["Acronyms","BYOD stands for:",["Bring Your Own Device","Buy Your Own Device","Business Your Own Domain","Bring Your Own Data"],0,"BYOD = Bring Your Own Device.","a"],
["Acronyms","COPE stands for:",["Corporate Owned Personally Enabled","Choose Own Personally Encrypted","Company Owned Privately Excluded","Cloud Operated Personal Endpoint"],0,"COPE = Corporate Owned, Personally Enabled.","a"],
["Keyboard/RAM","A laptop keyboard dies mid-meeting. Fastest fix:",["Order a replacement","External USB keyboard","Reinstall the OS","Replace the motherboard"],1,"External USB keyboard = fastest temporary workaround.",""],
["Ownership","A company buys phones but lets staff choose iPhone or Galaxy from an approved list. This is:",["BYOD","COPE","CYOD","MDM"],2,"CYOD = company-owned, employee picks from approved list.",""],
["MDM","After MDM enrollment, work email appeared automatically. Why:",["App autofilled settings","MDM pushed the configuration","SIM had the info","Carrier did it"],1,"MDM auto-configures corporate email — zero manual setup.",""],
["WiFi/Hotspot","A user wants to make calls over hotel WiFi. Before this works:",["5G capability needed","Carrier must support WiFi calling","Airplane mode first","Remove SIM"],1,"WiFi calling = requires carrier support.","g"],
["GPS","Driver's GPS is inaccurate inside a warehouse. Accuracy improves by also using:",["More GPS satellites","WiFi signals and cellular tower data","Bluetooth beacons","NFC tags"],1,"Indoors: GPS + WiFi + cellular towers = better accuracy.",""],
["MDM","IT needs to manage only work apps on personal phone, not personal photos. MDM approach:",["Full device enrollment","Managed partition enrollment","Replace with COPE","Factory wipe"],1,"MDM partition manages only work content.",""],
["Storage","Tech wants to move from HDD to SSD keeping all apps and settings:",["Fresh OS install","Use cloning or imaging software","Copy only documents","Format the old drive first"],1,"Cloning preserves all data and apps without OS reinstall.",""],
["Ports","FTP data port:",["20","21","22","25"],0,"FTP data = port 20.","s2"],
["Ports","FTP control port:",["20","21","22","25"],1,"FTP control = port 21.","s2"],
["Ports","SSH port:",["21","22","23","25"],1,"SSH = tcp/22.","s2"],
["Ports","Telnet port:",["21","22","23","25"],2,"Telnet = tcp/23, unencrypted.","s2"],
["Ports","SMTP port:",["22","23","25","53"],2,"SMTP = tcp/25.","s2"],
["Ports","DNS default port and protocol:",["tcp/25","tcp/53","udp/53","udp/67"],2,"DNS = udp/53 (tcp/53 for zone transfers).","sg2"],
["Ports","DHCP ports:",["tcp/67-68","udp/67-68","tcp/80","udp/53-54"],1,"DHCP = udp/67 (server) and udp/68 (client).","s2"],
["Ports","HTTP port:",["53","80","443","8080"],1,"HTTP = tcp/80.","s2"],
["Ports","POP3 port:",["80","110","143","389"],1,"POP3 = tcp/110.","s2"],
["Ports","IMAP4 port:",["80","110","143","389"],2,"IMAP4 = tcp/143.","s2"],
["Ports","LDAP port:",["143","389","443","445"],1,"LDAP = tcp/389.","s2"],
["Ports","HTTPS port:",["80","389","443","3389"],2,"HTTPS = tcp/443.","s2"],
["Ports","SMB direct port:",["139","389","443","445"],3,"Direct SMB = tcp/445.","s2"],
["Ports","RDP port:",["389","445","3389","5004"],2,"RDP = tcp/3389.","s2"],
["Ports","VoIP port:",["443","3389","5004","8080"],2,"VoIP = udp/5004.","s2"],
["Ports","Well-known port range:",["0-65535","0-1023","1024-65535","1024-9999"],1,"Well-known = 0-1023.","s2"],
["Ports","Ephemeral port range:",["0-1023","1024-4095","1024-65535","32768-65535"],2,"Ephemeral = 1024-65535.","s2"],
["TCP/UDP","TCP is:",["Fast, connectionless","Reliable, connection-oriented","No error recovery","Same as UDP"],1,"TCP = reliable, connection-oriented, error recovery.","2"],
["TCP/UDP","UDP is:",["Reliable, connection-oriented","Fast, no delivery guarantee","Same as TCP","Slower than TCP"],1,"UDP = fast, connectionless, no delivery guarantee.","2"],
["TCP/UDP","Real-time voice calls use:",["TCP","UDP","Both","Neither"],1,"UDP suits real-time audio.","2"],
["TCP/UDP","TCP and UDP operate at OSI Layer:",["2","3","4","7"],2,"Both TCP and UDP = Layer 4 (Transport).","s2"],
["TCP/UDP","DNS uses TCP specifically for:",["All queries","Zone transfers","Web traffic","Email relay"],1,"DNS uses tcp/53 for zone transfers only.","g2"],
["TCP/UDP","FTP requires how many ports?",["One","Two","Three","Four"],1,"FTP uses ports 20 (data) and 21 (control).","g2"],
["Wireless","802.11ac = ?",["WiFi 4","WiFi 5","WiFi 6","WiFi 7"],1,"802.11ac = WiFi 5.","s2"],
["Wireless","802.11ax = ?",["WiFi 5","WiFi 6","WiFi 6E","WiFi 7"],1,"802.11ax = WiFi 6 / WiFi 6E.","s2"],
["Wireless","802.11be = ?",["WiFi 6","WiFi 6E","WiFi 7","WiFi 8"],2,"802.11be = WiFi 7.","s2"],
["Wireless","WiFi 6E adds which band?",["2.4 GHz","5 GHz","6 GHz","10 GHz"],2,"WiFi 6E adds the 6 GHz band.","g2"],
["Wireless","Bluetooth and 2.4 GHz WiFi can interfere because:",["Same hardware","They share the unlicensed ISM band","Same IP range","Same channel width"],1,"Both use the unlicensed 2.4 GHz ISM band.","g2"],
["Wireless","RFID vs NFC:",["RFID is two-way; NFC is one-way","NFC is two-way; RFID is mostly one-way","Identical","RFID needs WiFi"],1,"NFC = two-way; RFID = mostly one-way.","g2"],
["Net Services","DORA stands for:",["Detect-Open-Receive-Assign","Discover-Offer-Request-Acknowledge","Distribute-Offer-Route-Accept","Discover-Open-Request-Ack"],1,"DORA = Discover, Offer, Request, Acknowledge.","s2"],
["Net Services","DHCP reservation vs static IP:",["Identical","Reservation = DHCP-managed by MAC; static = set on device","Reservation changes daily","Static IPs don't work with routers"],1,"Reservation = DHCP-managed; static = manual on device.","g2"],
["Net Services","DNS A record holds:",["IPv6","IPv4","Mail server name","Domain alias"],1,"A record = IPv4 address.","s2"],
["Net Services","DNS AAAA record holds:",["IPv4","IPv6","Mail server name","Domain alias"],1,"AAAA record = IPv6 address.","s2"],
["Net Services","MX record points to:",["An IP address","The mail server hostname","A VLAN ID","A MAC address"],1,"MX holds mail server hostname, not IP directly.","g2"],
["Net Services","SPF, DKIM, and DMARC are all stored as:",["A records","AAAA records","MX records","TXT records"],3,"All three email security mechanisms = DNS TXT records.","g2"],
["Net Services","AAA stands for:",["Authentication Authorization Accounting","Access Assignment Accounting","Authentication Access Audit","Authorization Allocation Accounting"],0,"AAA = Authentication, Authorization, Accounting.","s2"],
["Net Services","UTM device combines:",["Firewall only","Firewall, IDS/IPS, VPN, URL filtering, and more","Router and switch only","Firewall and DNS only"],1,"UTM = many security functions in one appliance.","2"],
["Net Services","SCADA systems must be:",["Directly internet-accessible","Strictly segmented from external networks","On public cloud","Connected to IoT directly"],1,"SCADA must be strictly segmented.","2"],
["Net Config","A VLAN separates devices:",["Physically with different cables","Logically — same switch, different broadcast domains","By MAC class","By speed only"],1,"VLANs = logical broadcast domain separation.","2"],
["Net Config","Client-to-site VPN connects:",["Two whole networks","One remote device to a network","Always-on LAN-to-LAN","Only site-to-site"],1,"Client-to-site = one remote device to a network.","g2"],
["Net Config","APIPA address range:",["10.0.0.0/8","192.168.0.0/16","169.254.0.0/16","172.16.0.0/12"],2,"APIPA = 169.254.x.x when DHCP fails.","sg2"],
["Net Config","Seeing a 169.254.x.x address means:",["Device has a static IP","DHCP assignment failed","IPv6 is active","VPN is connected"],1,"169.254.x.x = APIPA = DHCP not reachable.","g2"],
["Net Config","RFC 1918 private ranges:",["10.x, 172.16-31.x, 192.168.x","All 169.254.x","All 172.x","All 192.x"],0,"RFC 1918 = 10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16.","s2"],
["Net Config","IPv4 address size:",["16-bit","32-bit","64-bit","128-bit"],1,"IPv4 = 32-bit.","s2"],
["Net Config","IPv6 address size:",["32-bit","64-bit","128-bit","256-bit"],2,"IPv6 = 128-bit.","s2"],
["Net Devices","Routers forward traffic based on:",["MAC address","IP address (Layer 3)","Port number only","VLAN tag"],1,"Routers route by IP address at Layer 3.","2"],
["Net Devices","Switches forward traffic based on:",["IP address","Port number","MAC address (Layer 2)","VLAN tag only"],2,"Switches forward by MAC at Layer 2.","2"],
["Net Devices","Managed switches support all EXCEPT:",["VLANs via 802.1Q","SNMP management","Port mirroring","No-config plug-and-play only"],3,"Unmanaged = plug-and-play; managed = configurable.","g2"],
["Net Devices","AP vs wireless router:",["Identical","AP = bridge only; wireless router = AP + router","AP routes too","Routers are faster"],1,"AP bridges wired to wireless only.","g2"],
["Net Devices","Standard PoE max wattage:",["15.4W","25.5W","51W","71.3W"],0,"PoE = 15.4W.","s2"],
["Net Devices","PoE+ max wattage:",["15.4W","25.5W","51W","71.3W"],1,"PoE+ = 25.5W.","s2"],
["Net Devices","PoE++ Type 3 max wattage:",["15.4W","25.5W","51W","71.3W"],2,"PoE++ Type 3 = 51W.","s2"],
["Net Devices","PoE++ Type 4 max wattage:",["15.4W","25.5W","51W","71.3W"],3,"PoE++ Type 4 = 71.3W.","s2"],
["Net Devices","DSL typical speeds:",["1 Gbit/s each way","200 Mbit/s down / 20 Mbit/s up","50/50 Mbit/s","10/1 Mbit/s"],1,"DSL = ~200 Mbit/s down, ~20 Mbit/s up.","s2"],
["Net Devices","DSL distance limit:",["1,000 ft","5,000 ft","10,000 ft","50,000 ft"],2,"DSL degrades past ~10,000 ft from the CO.","s2"],
["Net Devices","ONT marks:",["Center of a LAN","ISP/customer demarc point for fiber","Default gateway","DNS server"],1,"ONT = demarcation point for fiber.","2"],
["Net Devices","DOCSIS is the standard for:",["DSL","Cable modem internet","Fiber","Satellite"],1,"DOCSIS = cable TV-based internet standard.","s2"],
["Net Types","LAN covers:",["A city","A building or campus","Global distances","~10 meters"],1,"LAN = building or campus.","2"],
["Net Types","WAN covers:",["A building","A city","Large geographic distances","~10 meters"],2,"WAN = large geographic distances.","2"],
["Net Types","PAN uses:",["Ethernet and MPLS","Bluetooth, IR, NFC","802.11 and fiber","DOCSIS"],1,"PAN = Bluetooth, IR, NFC.","s2"],
["Net Types","SAN vs NAS:",["SAN = file-level; NAS = block-level","SAN = block-level dedicated; NAS = file-level regular network","Identical","SAN = wireless"],1,"SAN = block-level dedicated; NAS = file-level.","g2"],
["Internet","Traditional satellite latency:",["10-25 ms","25-60 ms","~250 ms each way","Under 5 ms"],2,"Traditional satellite = ~250 ms each way.","s2"],
["Internet","DSL runs over:",["Cable TV lines","Fiber","Existing telephone lines","Satellite links"],2,"DSL = internet over telephone lines.","2"],
["Internet","Rain fade affects:",["DSL","Cable","Satellite","Fiber"],2,"Rain fade = satellite signal degradation.","g2"],
["Internet","Tethering vs mobile hotspot:",["Identical","Tethering = phone as router; hotspot = dedicated device","Hotspot faster always","Tethering needs WiFi"],1,"Tethering = phone directly; hotspot = separate device.","g2"],
["Net Tools","A cable tester checks:",["Signal quality and crosstalk","Full frequency performance","Continuity and wire map only","WiFi interference"],2,"Cable testers = continuity and wire map only.","g2"],
["Net Tools","Loopback plug vs crossover cable:",["Identical","Loopback = port back to itself; crossover = two devices","Crossover tests ports","Loopback connects two devices"],1,"Loopback = single port self-test; crossover = device-to-device.","g2"],
["Net Tools","Port mirror (SPAN) is:",["Hardware inserted inline","Software-based on a managed switch","Always better than physical tap","Only for fiber"],1,"SPAN = software port mirroring on managed switch.","g2"],
["Net Tools","A WiFi analyzer shows:",["Cable continuity","Channels, signal strength, interference, nearby APs","Punch down wiring","Port activity only"],1,"WiFi analyzers display channel, signal, and interference data.","2"],
["Ports","A tech tries SSH to a server and gets connection refused. Blocked port:",["Port 21","Port 22","Port 23","Port 443"],1,"SSH = tcp/22; connection refused = port blocked.","2"],
["Net Config","A new workstation gets IP 169.254.100.5 after joining network. This indicates:",["A VPN is active","A static IP was set","DHCP server is unreachable","IPv6 is assigned"],2,"169.254.x.x = APIPA = DHCP not reachable.","g2"],
["Net Services","A user can open sites by typing 8.8.8.8 but not google.com. Failing service:",["HTTP","DHCP","DNS","SMTP"],2,"DNS translates names to IPs — if down, names fail.","2"],
["Ports","Employees can receive email but not send. Likely blocked:",["POP3 / port 110","IMAP4 / port 143","SMTP / port 25","HTTPS / port 443"],2,"Sending email = SMTP (tcp/25).","2"],
["Net Devices","An IP camera connects via Ethernet but won't power on. Most likely:",["Wrong VLAN","Switch doesn't supply PoE or has insufficient wattage","DNS failure","Wrong IP address"],1,"IP cameras draw power via PoE — no PoE = no power.","g2"],
["Net Config","A remote employee needs secure encrypted access to company network from home:",["Increase DHCP lease time","Set up a client-to-site VPN","Implement site-to-site VPN","Add them to a VLAN"],1,"Client-to-site VPN = single remote device to a network.","g2"],
["Net Devices","ISP fiber cable terminates at a small box on the exterior building wall. This device:",["A cable modem","A wireless router","An ONT (Optical Network Terminal)","A patch panel"],2,"ONT = demarcation point for fiber.","2"],
["Internet","A subscriber 11,500 feet from CO gets much slower DSL than advertised. Why:",["Too many LAN devices","DSL degrades past ~10,000 ft","Router needs update","WiFi interference"],1,"DSL degrades past ~10,000 ft.","g2"],
["Net Config","Two branch offices need permanent communication as if on one internal network:",["Client-to-site VPN for each employee","Site-to-site VPN between both locations","Create VLANs at each site","Use DHCP reservations"],1,"Site-to-site VPN = two entire networks connected permanently.","g2"],
["Net Devices","A user adds a wireless AP but still can't reach a different subnet. Why:",["AP routes between subnets","AP = bridge only; it does not route between subnets","AP has built-in firewall","AP assigns IPs via DHCP"],1,"AP = bridge only, not a router.","g2"],
["Net Config","A device on DHCP suddenly shows 169.254.44.2. Most likely:",["Manually set to static","DHCP server went down","VPN expired","MAC address changed"],1,"169.254.x.x = APIPA = DHCP failure.","2"],
["Net Services","A company's outgoing emails land in spam. First DNS record to verify:",["AAAA record","MX record","CNAME record","SPF TXT record"],3,"SPF defines which servers may send — missing = spam flags.","2"],
];

const FC=[
["SO-DIMM","Small Outline Dual In-line Memory Module — compact laptop RAM.","acronym",1],
["HDD","Hard Disk Drive — spinning magnetic; 2.5in laptop, 3.5in desktop.","acronym",1],
["SSD","Solid State Drive — flash-based, no moving parts; faster and quieter.","acronym",1],
["M.2","Compact storage form factor; no SATA cables; 1 screw install.","acronym",1],
["NFC","Near Field Communication — ~4 cm range; payments and auth.","acronym",1],
["TRRS","Tip-Ring-Ring-Sleeve — 4-contact 3.5mm headset jack.","acronym",1],
["LTE","Long Term Evolution — 4G standard; 150 Mbit/s max.","acronym",1],
["LTE-A","LTE Advanced — up to 300 Mbit/s.","acronym",1],
["SIM","Subscriber Identity Module — identifies a cellular subscriber.","acronym",1],
["eSIM","Embedded SIM — built into device; cannot be physically removed.","acronym",1],
["GPS","Global Positioning System — satellite-based; needs 4+ satellites for fix.","acronym",1],
["MDM","Mobile Device Management — centralized mobile device management.","acronym",1],
["BYOD","Bring Your Own Device — employee-owned; least IT control.","acronym",1],
["COPE","Corporate Owned, Personally Enabled — company-owned, full IT control.","acronym",1],
["CYOD","Choose Your Own Device — company-owned; employee picks model.","acronym",1],
["Memory effect","NiCd battery flaw from partial charging. Li-ion/LiPo do NOT have this.","term",1],
["Docking station","Extends laptop at desk; can add new interfaces via expansion cards.","term",1],
["Port replicator","Only duplicates existing ports; no expansion capability.","term",1],
["Wi-Fi calling","Voice calls over Wi-Fi; requires carrier support.","term",1],
["Biometrics","Auth by physical characteristic — something you are.","term",1],
["Airplane mode","Disables all cellular radios; Wi-Fi/BT can re-enable separately.","term",1],
["NFC vs Bluetooth","NFC ~4 cm; Bluetooth ~10 meters.","confusable",1],
["USB-C vs Lightning","USB-C = universal (24-pin); Lightning = Apple-only (8-pin).","confusable",1],
["Docking station vs Port replicator","Docking station adds new functionality; port replicator only repeats existing ports.","confusable",1],
["SIM vs eSIM","SIM = removable card; eSIM = embedded, cannot be removed.","confusable",1],
["BYOD vs COPE","BYOD = employee owns; COPE = company owns.","confusable",1],
["COPE vs CYOD","Both company-owned; CYOD = employee picks the model.","confusable",1],
["M.2 SSD vs 2.5in SSD","M.2 = smaller, no SATA, 1 screw; 2.5in = SATA cables, 2 screws.","confusable",1],
["FTP","File Transfer Protocol; tcp/20 = data, tcp/21 = control.","acronym",2],
["SSH","Secure Shell; encrypted remote access; tcp/22.","acronym",2],
["SMTP","Simple Mail Transfer Protocol; server-to-server email; tcp/25.","acronym",2],
["DNS","Domain Name System; name to IP; udp/53 (tcp for zone transfers).","acronym",2],
["DHCP","Dynamic Host Config Protocol; auto-assigns IPs; udp/67-68.","acronym",2],
["HTTP / HTTPS","Web: HTTP = tcp/80 (unencrypted); HTTPS = tcp/443 (encrypted).","acronym",2],
["POP3 / IMAP4","Email: POP3 = tcp/110 basic; IMAP4 = tcp/143 multi-device.","acronym",2],
["RDP","Remote Desktop Protocol; tcp/3389.","acronym",2],
["SMB","Server Message Block; Windows file/printer sharing; tcp/445.","acronym",2],
["DORA","DHCP steps: Discover → Offer → Request → Acknowledge.","term",2],
["APIPA","169.254.x.x; self-assigned when DHCP fails; not routed.","term",2],
["VLAN","Virtual LAN; logical broadcast domain separation on a switch.","term",2],
["VPN","Virtual Private Network; encrypted tunnel over public network.","term",2],
["RFC 1918","Private IP ranges: 10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16.","term",2],
["UTM","Unified Threat Management; firewall + IDS/IPS + VPN + filtering.","term",2],
["AAA","Authentication, Authorization, Accounting — access control framework.","term",2],
["PoE wattages","PoE = 15.4W; PoE+ = 25.5W; PoE++ Type 3 = 51W; Type 4 = 71.3W.","term",2],
["DOCSIS","Data Over Cable Service Interface Specification; cable internet standard.","term",2],
["SPAN","Switched Port ANalyzer; software port mirror on a managed switch.","term",2],
["TCP vs UDP","TCP = reliable, connection-oriented; UDP = fast, connectionless.","confusable",2],
["POP3 vs IMAP4","POP3 (110) = basic retrieval; IMAP4 (143) = multi-device inbox.","confusable",2],
["HTTP vs HTTPS","HTTP (80) = unencrypted; HTTPS (443) = encrypted with TLS.","confusable",2],
["AP vs Wireless Router","AP = bridge only; Wireless router = AP + router combined.","confusable",2],
["Unmanaged vs Managed Switch","Unmanaged = plug-and-play; Managed = VLANs, SNMP, port mirroring.","confusable",2],
["Client-to-site vs Site-to-site VPN","Client-to-site = one device to network; Site-to-site = two networks.","confusable",2],
["SAN vs NAS","SAN = block-level, dedicated network; NAS = file-level, regular network.","confusable",2],
["Loopback plug vs Crossover cable","Loopback = port to itself; Crossover = two devices directly connected.","confusable",2],
["A vs AAAA record","A = IPv4; AAAA = IPv6.","confusable",2],
["DHCP reservation vs Static IP","Reservation = DHCP-managed by MAC; Static = manually set on device.","confusable",2],
];

const CAT={acronym:{label:"Acronym",color:"bg-blue-400/20 text-blue-200 border-blue-400/40"},term:{label:"Term",color:"bg-purple-400/20 text-purple-200 border-purple-400/40"},confusable:{label:"Confusable",color:"bg-rose-400/20 text-rose-200 border-rose-400/40"}};
const MODES={
  quiz:{label:"Quiz Mode",desc:"Full mix of recall + scenario questions.",icon:Smartphone,size:25,filter:()=>true,grad:"from-blue-500 to-cyan-400",card:"bg-gradient-to-br from-blue-500/15 to-cyan-400/5 border-blue-400/30 hover:border-blue-400/60",bar:"bg-gradient-to-r from-blue-500 to-cyan-400",text:"text-blue-300",soft:"bg-blue-500/10 border-blue-400/20"},
  spec:{label:"Spec Drill",desc:"Timed questions on numbers, speeds, and specs.",icon:Clock,size:20,filter:q=>q[5].includes("s"),grad:"from-amber-500 to-orange-400",card:"bg-gradient-to-br from-amber-500/15 to-orange-400/5 border-amber-400/30 hover:border-amber-400/60",bar:"bg-gradient-to-r from-amber-500 to-orange-400",text:"text-amber-300",soft:"bg-amber-500/10 border-amber-400/20"},
  gotcha:{label:"Gotcha Challenge",desc:"Tricky confusables and exam gotchas.",icon:AlertTriangle,size:20,filter:q=>q[5].includes("g"),grad:"from-rose-500 to-pink-500",card:"bg-gradient-to-br from-rose-500/15 to-pink-500/5 border-rose-400/30 hover:border-rose-400/60",bar:"bg-gradient-to-r from-rose-500 to-pink-500",text:"text-rose-300",soft:"bg-rose-500/10 border-rose-400/20"},
};
const FS={grad:"from-purple-500 to-indigo-400",card:"bg-gradient-to-br from-purple-500/15 to-indigo-400/5 border-purple-400/30",bar:"bg-gradient-to-r from-purple-500 to-indigo-400"};
const TS={card:"bg-gradient-to-br from-cyan-500/10 to-emerald-400/5 border-cyan-400/20"};
const SK="d1d2-v4",FK="d1d2-fc-v4";
const SPEC_TIME=15,MASTERY=2;
function shuffle(a){const b=[...a];for(let i=b.length-1;i>0;i--){const j=0|Math.random()*(i+1);[b[i],b[j]]=[b[j],b[i]];}return b;}
function defStats(){return{quiz:{best:0,attempts:0},spec:{best:0,attempts:0},gotcha:{best:0,attempts:0},topics:{},xp:0};}

export default function App(){
  const[screen,setScreen]=useState("menu");
  const[mode,setMode]=useState(null);
  const[dom,setDom]=useState("all");
  const[rq,setRq]=useState([]);
  const[idx,setIdx]=useState(0);
  const[sel,setSel]=useState(null);
  const[answered,setAnswered]=useState(false);
  const[score,setScore]=useState(0);
  const[streak,setStreak]=useState(0);
  const[maxStr,setMaxStr]=useState(0);
  const[tStats,setTStats]=useState({});
  const[missed,setMissed]=useState([]);
  const[stats,setStats]=useState(defStats());
  const[ready,setReady]=useState(false);
  const[timeLeft,setTimeLeft]=useState(SPEC_TIME);
  const[fm,setFm]=useState({});
  const[deck,setDeck]=useState([]);
  const[fi,setFi]=useState(0);
  const[flipped,setFlipped]=useState(false);
  const[flog,setFlog]=useState([]);
  const[xpToast,setXpToast]=useState(null);
  const[rankUpMsg,setRankUpMsg]=useState(null);
  const[resetConfirm,setResetConfirm]=useState(false);
  const[manualOpen,setManualOpen]=useState(false);
  const[manualCount,setManualCount]=useState("");
  const[manualDiff,setManualDiff]=useState("quiz");
  const timer=useRef(null);
  const toastRef=useRef(null);
  const ruRef=useRef(null);
  const sRef=useRef(stats);
  sRef.current=stats;

  // ── localStorage (replaces window.storage) ──
  useEffect(()=>{
    try{const v=localStorage.getItem(SK);if(v){const p=JSON.parse(v);setStats({...defStats(),...p,topics:p.topics||{},xp:p.xp||0});}}catch(e){}
    try{const v=localStorage.getItem(FK);if(v)setFm(JSON.parse(v));}catch(e){}
    setReady(true);
  },[]);

  function saveStats(s){setStats(s);sRef.current=s;try{localStorage.setItem(SK,JSON.stringify(s));}catch(e){}}
  const saveFm=useCallback(m=>{setFm(m);try{localStorage.setItem(FK,JSON.stringify(m));}catch(e){};},[]);

  function awardXP(amt){
    const cur=sRef.current,prev=cur.xp||0,next=prev+amt;
    const pi=getRankIdx(prev),ni=getRankIdx(next);
    saveStats({...cur,xp:next});
    clearTimeout(toastRef.current);
    setXpToast({amt,key:Date.now()});
    toastRef.current=setTimeout(()=>setXpToast(null),1600);
    if(ni>pi){clearTimeout(ruRef.current);setRankUpMsg(RANKS[ni]);ruRef.current=setTimeout(()=>setRankUpMsg(null),3000);}
  }

  function inDom(q){if(dom==="all")return true;if(dom==="2")return q[5].includes("2");return!q[5].includes("2");}

  useEffect(()=>{
    if(mode==="spec"&&screen==="play"&&!answered){
      setTimeLeft(SPEC_TIME);
      timer.current=setInterval(()=>setTimeLeft(t=>{if(t<=1){clearInterval(timer.current);doTimeout();return 0;}return t-1;}),1000);
      return()=>clearInterval(timer.current);
    }
  },[idx,screen,mode]);

  function doTimeout(){setAnswered(true);setSel(-1);regAnswer(false);}

  function startRound(mk){
    const cfg=MODES[mk],pool=Q.filter(cfg.filter).filter(inDom),size=Math.min(cfg.size,pool.length);
    const picked=shuffle(pool).slice(0,size).map(t=>({topic:t[0],q:t[1],opts:t[2],correct:t[3],exp:t[4]}));
    setMode(mk);setRq(picked);setIdx(0);setSel(null);setAnswered(false);
    setScore(0);setStreak(0);setMaxStr(0);setTStats({});setMissed([]);setScreen("play");
  }

  function regAnswer(ok){
    const q=rq[idx];
    setTStats(prev=>{const t=prev[q.topic]||{c:0,n:0};return{...prev,[q.topic]:{c:t.c+(ok?1:0),n:t.n+1}};});
    if(ok){
      setScore(s=>s+1);
      const ns=streak+1;setStreak(ns);setMaxStr(m=>Math.max(m,ns));
      awardXP((mode==="quiz"?20:25)+(ns>=3?5:0));
    }else{setStreak(0);setMissed(m=>[...m,q]);}
  }

  function pick(i){if(answered)return;clearInterval(timer.current);setSel(i);setAnswered(true);regAnswer(i===rq[idx].correct);}

  function next(){
    if(idx+1>=rq.length){
      const cur=sRef.current,merged={...cur.topics};
      setTStats(prev=>{Object.entries(prev).forEach(([t,v])=>{const e=merged[t]||{c:0,n:0};merged[t]={c:e.c+v.c,n:e.n+v.n};});return prev;});
      setTimeout(()=>{
        const c=sRef.current;
        saveStats({...c,topics:merged,[mode]:{best:Math.max((c[mode]||{best:0}).best,score),attempts:((c[mode]||{attempts:0}).attempts)+1}});
        awardXP(50);setScreen("results");
      },0);
    }else{setIdx(i=>i+1);setSel(null);setAnswered(false);}
  }

  function fpPool(){return FC.filter(c=>dom==="all"||String(c[3])===dom);}

  function startFlash(weakOnly){
    let src=fpPool();
    if(weakOnly){const f=src.filter(c=>!(fm[c[0]]&&fm[c[0]].s>=MASTERY));if(f.length>0)src=f;}
    setDeck(shuffle(src));setFi(0);setFlipped(false);setFlog([]);setScreen("fp");
  }

  function markCard(known){
    const c=deck[fi];
    setFlog(p=>[...p,{id:c[0],known}]);
    saveFm({...fm,[c[0]]:{s:known?(fm[c[0]]?.s||0)+1:0}});
    if(known)awardXP(8);
    if(fi+1>=deck.length)setScreen("fr");
    else{setFi(i=>i+1);setFlipped(false);}
  }

  function back(){clearInterval(timer.current);setScreen("menu");setMode(null);}

  const fp=fpPool(),mastered=fp.filter(c=>fm[c[0]]?.s>=MASTERY).length,weak=fp.length-mastered;
  const curXP=stats.xp||0,ri=getRankIdx(curXP),rank=RANKS[ri],nextRank=RANKS[ri+1]||null;
  const rc=rColor(rank[2]),rankPct=nextRank?Math.round(((curXP-rank[3])/(nextRank[3]-rank[3]))*100):100;
  const weakTopic=(()=>{const e=Object.entries(stats.topics).filter(([,v])=>v.n>=3);if(!e.length)return null;e.sort((a,b)=>a[1].c/a[1].n-b[1].c/b[1].n);return e[0];})();

  if(!ready)return<div style={{display:"flex",alignItems:"center",justifyContent:"center",height:"100vh",background:"#0f172a",color:"#94a3b8"}}>Loading…</div>;
  const q=rq[idx],ms=mode?MODES[mode]:null;

  return(
    <div style={{minHeight:"100vh",background:"linear-gradient(to bottom right,#0f172a,#0f172a,#1e1b4b)"}}>
    <style>{`@keyframes fpop{0%{opacity:0;transform:translateY(8px)}20%{opacity:1}80%{opacity:1}100%{opacity:0;transform:translateY(-12px)}}`}</style>
    {xpToast&&<div key={xpToast.key} style={{position:"fixed",top:64,right:16,zIndex:50,padding:"6px 12px",borderRadius:12,background:"#fbbf24",color:"#1c1917",fontWeight:"bold",fontSize:14,boxShadow:"0 10px 25px rgba(0,0,0,0.3)",pointerEvents:"none",animation:"fpop 1.6s ease forwards"}}>+{xpToast.amt} XP</div>}
    {rankUpMsg&&<div style={{position:"fixed",left:16,right:16,top:16,zIndex:50,display:"flex",justifyContent:"center"}}><div style={{padding:"12px 24px",borderRadius:16,background:"linear-gradient(to right,#facc15,#fb923c)",color:"#1c1917",textAlign:"center",boxShadow:"0 25px 50px rgba(0,0,0,0.5)",display:"flex",alignItems:"center",gap:12}}><img src={rankImg(rankUpMsg[1])} alt={rankUpMsg[0]} style={{width:40,height:40,borderRadius:8,objectFit:"cover"}}/><div><div style={{fontSize:11,fontWeight:"bold",textTransform:"uppercase",letterSpacing:"0.1em",opacity:0.7}}>Rank Up!</div><div style={{fontSize:18,fontWeight:"bold"}}>{rankUpMsg[0]}</div></div></div></div>}
    <div className="text-white p-4"><div className="max-w-2xl mx-auto">

      <div className="flex items-center gap-3 mb-4">
        <div className="p-2.5 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 shadow-lg"><Smartphone className="w-5 h-5"/></div>
        <div><div className="text-xl font-bold">A+ Arcade</div><div className="text-slate-400 text-xs">CompTIA A+ Core 1 Study Game</div></div>
        {screen!=="menu"&&<button onClick={back} className="ml-auto flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-sm"><Home className="w-4 h-4"/> Menu</button>}
      </div>

      {screen==="menu"&&(
        <div>
          <div className={`rounded-2xl p-4 border mb-4 bg-gradient-to-br ${rc.card}`}>
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-xl shrink-0 shadow-lg overflow-hidden" style={{background:rc.badge}}>
                <img src={rankImg(rank[1])} alt={rank[0]} className="w-full h-full object-cover" onError={e=>{e.target.style.display="none";}}/>
              </div>
              <div className="flex-1 min-w-0">
                <div className={`text-xs font-semibold ${rc.txt} mb-0.5`}>Rank {ri+1} / {RANKS.length}</div>
                <div className="font-bold text-white truncate">{rank[0]}</div>
                <div className="text-xs text-slate-400">{curXP.toLocaleString()} XP</div>
              </div>
              <div className="text-right shrink-0">
                {nextRank?(<><div className="text-xs text-slate-400">{(nextRank[3]-curXP).toLocaleString()} to</div><div className="text-xs font-medium text-slate-300 truncate max-w-24">{nextRank[0]}</div></>):<div className="text-xs font-bold text-yellow-300">★ MAX RANK</div>}
              </div>
            </div>
            <div className="mt-3 h-2 rounded-full overflow-hidden" style={{background:"rgba(0,0,0,0.35)"}}>
              <div className="h-full rounded-full transition-all" style={{width:`${rankPct}%`,background:rBar(rank[2])}}/>
            </div>
          </div>

          <div className="flex gap-2 mb-4">
            {[["all","All Domains"],["1","Domain 1"],["2","Domain 2"]].map(([v,l])=>(
              <button key={v} onClick={()=>setDom(v)} className={`flex-1 py-2 rounded-xl text-xs font-medium transition-all ${dom===v?"bg-gradient-to-r from-blue-500 to-cyan-400":"bg-white/10 hover:bg-white/20 text-slate-300"}`}>{l}</button>
            ))}
          </div>

          <div className="grid gap-3 sm:grid-cols-3 mb-4">
            {Object.entries(MODES).map(([k,m])=>{
              const Icon=m.icon,s=stats[k];
              return(<button key={k} onClick={()=>startRound(k)} className={`text-left rounded-2xl p-4 border transition-all ${m.card}`}>
                <div className={`inline-flex p-2 rounded-xl bg-gradient-to-br ${m.grad} mb-2`}><Icon className="w-4 h-4"/></div>
                <div className="font-semibold text-sm mb-1">{m.label}</div>
                <div className="text-slate-300/80 text-xs mb-2">{m.desc}</div>
                <div className={`text-xs font-medium ${m.text}`}>{s.attempts>0?`Best: ${s.best} · ${s.attempts} plays`:"Not played yet"}</div>
              </button>);
            })}
          </div>

          <div className={`rounded-2xl p-4 border mb-4 ${FS.card}`}>
            <div className="flex items-center gap-3 mb-3">
              <div className={`inline-flex p-2 rounded-xl bg-gradient-to-br ${FS.grad}`}><BookOpen className="w-4 h-4"/></div>
              <div><div className="font-semibold text-sm">Flashcard Study</div><div className="text-slate-300/80 text-xs">{fp.length} cards — acronyms, terms &amp; confusables.</div></div>
            </div>
            <div className="flex items-center gap-3 mb-3">
              <div className="flex-1 h-1.5 rounded-full bg-white/10 overflow-hidden"><div className={`h-full rounded-full ${FS.bar}`} style={{width:`${fp.length?((mastered/fp.length)*100):0}%`}}/></div>
              <span className="text-xs text-purple-200 shrink-0">{mastered}/{fp.length} mastered</span>
            </div>
            <div className="grid grid-cols-2 gap-2 mb-2">
              <button onClick={()=>startFlash(false)} className="py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-sm font-medium flex items-center justify-center gap-1.5"><Layers className="w-3.5 h-3.5"/> Study All</button>
              <button onClick={()=>startFlash(true)} disabled={weak===0} className={`py-2.5 rounded-xl bg-gradient-to-r ${FS.grad} hover:opacity-90 text-sm font-medium flex items-center justify-center gap-1.5 disabled:opacity-40`}><Target className="w-3.5 h-3.5"/> {weak===0?"All Mastered 🎉":`Weak (${weak})`}</button>
            </div>
            {!resetConfirm
              ?<button onClick={()=>setResetConfirm(true)} className="w-full py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-slate-400 flex items-center justify-center gap-1.5"><RefreshCw className="w-3 h-3"/> Reset Mastery Progress</button>
              :<div className="rounded-xl bg-rose-500/10 border border-rose-400/30 p-3"><div className="text-xs text-rose-300 text-center mb-2 font-medium">Reset all flashcard mastery?</div><div className="grid grid-cols-2 gap-2"><button onClick={()=>{saveFm({});setResetConfirm(false);}} className="py-2 rounded-lg bg-rose-500/20 border border-rose-400/40 text-rose-200 text-xs font-medium">Yes, Reset</button><button onClick={()=>setResetConfirm(false)} className="py-2 rounded-lg bg-white/10 text-slate-300 text-xs font-medium">Cancel</button></div></div>}
          </div>

          <div className="mb-4">
            <button onClick={()=>setManualOpen(o=>!o)} className="w-full py-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-xs text-slate-300 flex items-center justify-center gap-1.5"><Zap className="w-3.5 h-3.5 text-amber-400"/> Log outside study session</button>
            {manualOpen&&<div className="mt-2 rounded-2xl p-4 bg-white/5 border border-white/10">
              <div className="font-semibold text-sm mb-1">Log Study Session</div>
              <div className="text-xs text-slate-400 mb-3">Studied outside the app? Enter how many questions you got right.</div>
              <input type="number" min="0" max="999" value={manualCount} onChange={e=>setManualCount(e.target.value)} placeholder="# of correct answers" className="w-full rounded-xl px-3 py-2.5 mb-3 text-sm bg-black/30 border border-white/20 text-white placeholder-slate-500 outline-none"/>
              <div className="flex gap-2 mb-3">
                {[["quiz","Normal (+20 XP ea.)"],["hard","Hard (+25 XP ea.)"]].map(([v,l])=>(
                  <button key={v} onClick={()=>setManualDiff(v)} className={`flex-1 py-2 rounded-xl text-xs font-medium ${manualDiff===v?"bg-gradient-to-r from-blue-500 to-cyan-400":"bg-white/10 text-slate-300"}`}>{l}</button>
                ))}
              </div>
              {parseInt(manualCount)>0&&<div className="text-xs text-amber-300 text-center mb-3 font-medium">+{parseInt(manualCount)*(manualDiff==="quiz"?20:25)} XP will be added</div>}
              <div className="grid grid-cols-2 gap-2">
                <button onClick={()=>{setManualOpen(false);setManualCount("");}} className="py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-sm font-medium">Cancel</button>
                <button onClick={()=>{const n=parseInt(manualCount)||0;if(n>0)awardXP(n*(manualDiff==="quiz"?20:25));setManualOpen(false);setManualCount("");}} disabled={!(parseInt(manualCount)>0)} className="py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-400 text-sm font-medium disabled:opacity-40">Add XP</button>
              </div>
            </div>}
          </div>

          <div className={`rounded-2xl p-4 border ${TS.card}`}>
            <div className="flex items-center gap-2 mb-3"><Target className="w-4 h-4 text-emerald-300"/><span className="font-semibold text-sm">Topic accuracy</span></div>
            {!Object.keys(stats.topics).length?<p className="text-slate-300/70 text-sm">Play a round to track accuracy by topic.</p>
            :<div className="space-y-2">
              {Object.entries(stats.topics).sort((a,b)=>b[1].n-a[1].n).map(([t,v])=>{const pct=Math.round((v.c/v.n)*100);return(<div key={t} className="flex items-center gap-2"><span className="text-xs text-slate-300 w-28 shrink-0 truncate">{t}</span><div className="flex-1 h-1.5 rounded-full bg-white/10 overflow-hidden"><div className={`h-full rounded-full ${pct>=80?"bg-emerald-400":pct>=50?"bg-amber-400":"bg-rose-400"}`} style={{width:`${pct}%`}}/></div><span className="text-xs text-slate-300 w-8 text-right">{pct}%</span></div>);})}
              {weakTopic&&<p className="text-xs text-amber-300 pt-1">Weakest: <span className="font-medium">{weakTopic[0]}</span></p>}
            </div>}
          </div>
        </div>
      )}

      {screen==="play"&&q&&(
        <div>
          <div className="flex items-center justify-between mb-2 text-sm text-slate-300"><span>Q {idx+1}/{rq.length}</span><div className="flex items-center gap-4">{streak>1&&<span className="flex items-center gap-1 text-amber-300"><Zap className="w-3.5 h-3.5"/> {streak}</span>}<span>Score: {score}</span></div></div>
          <div className="h-1 rounded-full bg-white/10 mb-4 overflow-hidden"><div className={`h-full transition-all ${ms.bar}`} style={{width:`${(idx/rq.length)*100}%`}}/></div>
          {mode==="spec"&&<div className="flex items-center gap-2 mb-3 text-sm"><Clock className={`w-4 h-4 ${timeLeft<=5?"text-rose-400":"text-amber-400"}`}/><div className="flex-1 h-1.5 rounded-full bg-white/10 overflow-hidden"><div className={`h-full transition-all ${timeLeft<=5?"bg-rose-400":"bg-amber-400"}`} style={{width:`${(timeLeft/SPEC_TIME)*100}%`}}/></div><span className={`w-5 text-right text-xs ${timeLeft<=5?"text-rose-400":"text-slate-300"}`}>{timeLeft}</span></div>}
          <div className={`rounded-2xl p-5 border mb-3 ${ms.card}`}>
            <span className={`inline-block text-xs px-2 py-0.5 rounded-full border mb-3 ${ms.soft} ${ms.text}`}>{q.topic}</span>
            <h2 className="text-base font-medium mb-4">{q.q}</h2>
            <div className="grid gap-2">
              {q.opts.map((opt,i)=>{
                const isC=i===q.correct,isSel=sel===i;
                let cls="border-white/15 bg-white/5 hover:bg-white/10";
                if(answered){if(isC)cls="border-emerald-400/50 bg-emerald-400/15";else if(isSel)cls="border-rose-400/50 bg-rose-400/15";else cls="border-white/5 opacity-40";}
                return(<button key={i} onClick={()=>pick(i)} disabled={answered} className={`text-left px-3 py-2.5 rounded-xl border transition-colors flex items-center justify-between text-sm ${cls}`}><span>{opt}</span>{answered&&isC&&<Check className="w-4 h-4 text-emerald-400 shrink-0"/>}{answered&&isSel&&!isC&&<X className="w-4 h-4 text-rose-400 shrink-0"/>}</button>);
              })}
            </div>
            {answered&&<div className="mt-3 p-3 rounded-xl bg-black/20 border border-white/10 text-xs text-slate-200">{q.exp}</div>}
          </div>
          {answered&&<button onClick={next} className={`w-full py-3 rounded-xl bg-gradient-to-r ${ms.grad} font-medium hover:opacity-90 flex items-center justify-center gap-2 text-sm`}>{idx+1>=rq.length?"See Results":"Next"}<ChevronRight className="w-4 h-4"/></button>}
        </div>
      )}

      {screen==="results"&&ms&&(
        <div>
          <div className={`rounded-2xl p-5 border text-center mb-4 ${ms.card}`}><Trophy className="w-8 h-8 text-amber-300 mx-auto mb-2"/><div className="text-3xl font-bold mb-1">{score}/{rq.length}</div><div className="text-slate-200 text-sm mb-2">{MODES[mode].label} — {Math.round((score/rq.length)*100)}%</div><div className="flex items-center justify-center gap-5 text-xs text-slate-300"><span>Best streak: {maxStr}</span><span>Personal best: {stats[mode]?.best||0}/{rq.length}</span></div></div>
          {Object.keys(tStats).length>0&&<div className={`rounded-2xl p-4 border mb-4 ${TS.card}`}><div className="font-semibold text-sm mb-3">This round by topic</div><div className="space-y-2">{Object.entries(tStats).map(([t,v])=>{const pct=Math.round((v.c/v.n)*100);return(<div key={t} className="flex items-center gap-2"><span className="text-xs text-slate-300 w-28 shrink-0 truncate">{t}</span><div className="flex-1 h-1.5 rounded-full bg-white/10 overflow-hidden"><div className={`h-full rounded-full ${pct>=80?"bg-emerald-400":pct>=50?"bg-amber-400":"bg-rose-400"}`} style={{width:`${pct}%`}}/></div><span className="text-xs text-slate-300 w-10 text-right">{v.c}/{v.n}</span></div>);})}</div></div>}
          {missed.length>0&&<div className="rounded-2xl p-4 bg-gradient-to-br from-rose-500/10 to-rose-500/5 border border-rose-400/20 mb-4"><div className="font-semibold text-sm mb-3 flex items-center gap-2"><AlertTriangle className="w-4 h-4 text-rose-300"/> Missed</div><div className="space-y-3">{missed.map((q,i)=><div key={i} className="p-3 rounded-xl bg-black/20 border border-rose-400/20"><div className="text-sm font-medium mb-1">{q.q}</div><div className="text-sm text-emerald-300 mb-1">✓ {q.opts[q.correct]}</div><div className="text-xs text-slate-300">{q.exp}</div></div>)}</div></div>}
          <div className="grid grid-cols-2 gap-3"><button onClick={()=>startRound(mode)} className="py-3 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center gap-2 font-medium text-sm"><RotateCcw className="w-4 h-4"/> New Round</button><button onClick={back} className={`py-3 rounded-xl bg-gradient-to-r ${ms.grad} hover:opacity-90 flex items-center justify-center gap-2 font-medium text-sm`}><Home className="w-4 h-4"/> Menu</button></div>
        </div>
      )}

      {screen==="fp"&&deck.length>0&&(()=>{const c=deck[fi];return(
        <div>
          <div className="flex items-center justify-between mb-2 text-sm text-slate-300"><span>Card {fi+1}/{deck.length}</span><span>{flog.filter(l=>l.known).length} got it · {flog.filter(l=>!l.known).length} learning</span></div>
          <div className="h-1 rounded-full bg-white/10 mb-4 overflow-hidden"><div className={`h-full transition-all ${FS.bar}`} style={{width:`${(fi/deck.length)*100}%`}}/></div>
          <button onClick={()=>!flipped&&setFlipped(true)} className={`w-full text-left rounded-2xl p-6 border mb-4 min-h-[200px] flex flex-col ${FS.card}`}>
            <div className="flex items-center gap-2 mb-4"><span className={`text-xs px-2 py-0.5 rounded-full border w-fit ${CAT[c[2]].color}`}>{CAT[c[2]].label}</span><span className="text-xs px-2 py-0.5 rounded-full bg-white/10 text-slate-300">Domain {c[3]}</span></div>
            <div className="flex-1 flex items-center justify-center text-center"><h2 className="text-xl font-semibold">{c[0]}</h2></div>
            {flipped?<div className="mt-4 pt-4 border-t border-white/10 text-slate-200 text-sm text-center">{c[1]}</div>:<div className="mt-4 text-center text-slate-300/70 text-xs flex items-center justify-center gap-1"><BookOpen className="w-3 h-3"/> Tap to reveal</div>}
          </button>
          {flipped&&<div className="grid grid-cols-2 gap-3"><button onClick={()=>markCard(false)} className="py-3 rounded-xl bg-rose-400/15 border border-rose-400/40 hover:bg-rose-400/25 font-medium text-rose-200 flex items-center justify-center gap-2 text-sm"><X className="w-4 h-4"/> Still learning</button><button onClick={()=>markCard(true)} className="py-3 rounded-xl bg-emerald-400/15 border border-emerald-400/40 hover:bg-emerald-400/25 font-medium text-emerald-200 flex items-center justify-center gap-2 text-sm"><Check className="w-4 h-4"/> Got it</button></div>}
        </div>
      );})()}

      {screen==="fr"&&(
        <div>
          <div className={`rounded-2xl p-5 border text-center mb-4 ${FS.card}`}><BookOpen className="w-8 h-8 text-purple-300 mx-auto mb-2"/><div className="text-3xl font-bold mb-1">{flog.filter(l=>l.known).length}/{flog.length}</div><div className="text-slate-200 text-sm mb-2">marked "Got it"</div><div className="text-sm text-slate-300">Mastery: {mastered}/{fp.length} cards</div></div>
          {flog.filter(l=>!l.known).length>0&&<div className="rounded-2xl p-4 bg-gradient-to-br from-rose-500/10 to-rose-500/5 border border-rose-400/20 mb-4"><div className="font-semibold text-sm mb-3 flex items-center gap-2"><AlertTriangle className="w-4 h-4 text-rose-300"/> Still learning</div><div className="space-y-3">{flog.filter(l=>!l.known).map((l,i)=>{const c=FC.find(x=>x[0]===l.id);return c?(<div key={i} className="p-3 rounded-xl bg-black/20 border border-rose-400/20"><div className="text-sm font-medium mb-1">{c[0]}</div><div className="text-xs text-slate-300">{c[1]}</div></div>):null;})}</div></div>}
          <div className="grid grid-cols-2 gap-3"><button onClick={()=>startFlash(true)} className="py-3 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center gap-2 font-medium text-sm"><Target className="w-4 h-4"/> Review Weak</button><button onClick={back} className={`py-3 rounded-xl bg-gradient-to-r ${FS.grad} hover:opacity-90 flex items-center justify-center gap-2 font-medium text-sm`}><Home className="w-4 h-4"/> Menu</button></div>
        </div>
      )}

    </div></div></div>
  );
}