const { virtex90 } = require('./virtex/virtex90')
const { virtex2 } = require('./virtex/virtex2')
const { virtex3 } = require('./virtex/virtex3')
const { virtex4 } = require('./virtex/virtex4')
const { virtex5 } = require('./virtex/virtex5')
const { virtex6 } = require('./virtex/virtex6')
const { virtex7 } = require('./virtex/virtex7')
const { virtex8 } = require('./virtex/virtex8')
const { virtex9 } = require('./virtex/virtex9')
const { ngazap } = require('./virtex/ngazap')
const { virtag } = require('./virtex/virtag')
const { virteg } = require('./virtex/virteg')
const axios = require('axios')
const fs = require('fs')
const Pino = require('pino')
const chalk = require('chalk') 
const cfonts = require('cfonts')

const { log , color, nomes, cores, banner,
hora, data ,getGroupAdmins} = require('./arquivos/functions')

const getBuffer = (url, options) => new Promise(async (resolve, reject) => { 
options ? options : {}
await axios({method: "get", url, headers: {"DNT": 1, "Upgrade-Insecure-Request": 1}, ...options, responseType: "arraybuffer"}).then((res) => {
resolve(res.data)
}).catch(reject)
})

const prefix = '.'
const botName = 'supp'
const numero = '14509990471'
const criador = "spendragon"

const { default:  makeWASocket , makeInMemoryStore, DisconnectReason ,useSingleFileAuthState} = require ('@adiwajshing/baileys')

const { state } = useSingleFileAuthState('BarBar.json')

async function BlkzinStart () {
log(banner.string)
const client = makeWASocket({
logger: Pino({ level: 'silent' }),printQRInTerminal: true,auth: state})
client.ev.on('connection.update', (update) => {
const { connection, lastDisconnect } = update
if(connection === 'close') {
const shouldReconnect = (lastDisconnect.error)?.output?.statusCode !== DisconnectReason.loggedOut
log('connection closed due to ', lastDisconnect.error)
if(shouldReconnect) {BlkzinStart()}
} else if(connection === 'open') {
log(color(`${nomes} conecтado シ`,`${cores}`))}})
client.ev.on('messages.upsert', async m => {

const mek = m.messages[0]
await client.sendReadReceipt(mek.key.remoteJid, mek.key.participant, [mek.key.id])
if (!mek.key.participant) mek.key.participant = mek.key.remoteJid
mek.key.participant = mek.key.participant.replace(/:[0-9]+/gi, "")
if (!mek.message) return
const fromMe = mek.key.fromMe
const content = JSON.stringify(mek.message)
const from = mek.key.remoteJid
const type = Object.keys(mek.message).find((key) => !["senderKeyDistributionMessage", "messageContextInfo"].includes(key))

const body = (type === "conversation" &&
mek.message.conversation.startsWith(prefix)) ?
mek.message.conversation: (type == "imageMessage") &&
mek.message[type].caption.startsWith(prefix) ?
mek.message[type].caption: (type == "videoMessage") &&
mek.message[type].caption.startsWith(prefix) ?
mek.message[type].caption: (type == "extendedTextMessage") &&
mek.message[type].text.startsWith(prefix) ?
mek.message[type].text: (type == 'buttonsResponseMessage') ? mek.message.buttonsResponseMessage.selectedButtonId : 
(type == "listResponseMessage") &&
mek.message[type].singleSelectReply.selectedRowId ?
mek.message.listResponseMessage.singleSelectReply.selectedRowId: (type == "templateButtonReplyMessage") ?
mek.message.templateButtonReplyMessage.selectedId: (type === "messageContextInfo") ?
mek.message[type].singleSelectReply.selectedRowId: (type == "client.sendMessageButtonMessage") &&
mek.message[type].selectedButtonId ?
mek.message[type].selectedButtonId: (type == "stickerMessage") && ((mek.message[type].fileSha256.toString("base64")) !== null && (mek.message[type].fileSha256.toString("base64")) !== undefined) ? (mek.message[type].fileSha256.toString("base64")): ""
const budy = (type === "conversation") ?
mek.message.conversation: (type === "extendedTextMessage") ?
mek.message.extendedTextMessage.text: ""

const args = body.trim().split(/ +/).slice(1)
const q = args.join(' ')
const comando = body.slice(1).trim().split(/ +/).shift().toLowerCase()
const isCmd = body.startsWith(prefix)
const reply = (text) => {client.sendMessage(from, {text: text}, { quoted: mek})}

const botNumber = client.user.id.split(':')[0]+'@s.whatsapp.net'
const isGroup = from.endsWith("@g.us")
const groupMetadata = isGroup ? await client.groupMetadata(from): ""
const groupName = isGroup ? groupMetadata.subject: ""
const sender = isGroup ? mek.key.participant: mek.key.remoteJid
const pushname = mek.pushName ? mek.pushName: `${botName}`
const groupMembers = isGroup ? groupMetadata.participants : ''
const groupAdmins = isGroup ? getGroupAdmins(groupMembers) : ''
const isBotGroupAdmins = groupAdmins.includes(botNumber) || false
const isGroupAdmins = isGroup ? groupAdmins.includes(sender) : ''
const groupDesc = isGroup ? groupMetadata.desc : ''
const bkzin = `${numero}@s.whatsapp.net`
const isDono = bkzin.includes(sender)
const isQuotedMsg = type === "extendedTextMessage" && content.includes("textMessage")
const isQuotedImage = type === "extendedTextMessage" && content.includes("imageMessage")
const isQuotedVideo = type === "extendedTextMessage" && content.includes("videoMessage")
const isQuotedDocument = type === "extendedTextMessage" && content.includes("documentMessage")
const isQuotedAudio = type === "extendedTextMessage" && content.includes("audioMessage")
const isQuotedSticker = type === "extendedTextMessage" && content.includes("stickerMessage")
const isQuotedContact = type === "extendedTextMessage" && content.includes("contactMessage")
const isQuotedLocation = type === "extendedTextMessage" && content.includes("locationMessage")
const isQuotedProduct = type === "extendedTextMessage" && content.includes("productMessage")


if(!isGroup && isCmd) console.log(`
${color(`Comando No Pv ꨄ`)}
${color(`Comando シ`)} ${comando}
${color(`Nome シ`)} ${pushname}`)

if(!isCmd && !isGroup)
console.log(`
${color(`Mensagem No Pv ꨄ`)}
${color(`Mensagem シ :`)} ${budy}
${color(`Nome シ :`)} ${pushname}`)

if(isCmd && isGroup)
console.log(`
${color(`Comando Em Grupo 𓆉`)}
${color(`Comando ت︎ :`)} ${comando}
${color(`Grupo ت︎ :`)} ${groupName}
${color(`Nome ت︎ :`)} ${pushname}`)

if(!isCmd && isGroup) 
console.log(`
${color(`Mensagem Em Grupo 𓆉`)}
${color(`Grupo ت︎ :`)} ${groupName}
${color(`Nome ت︎ :`)} ${pushname}
${color(`Mensagem ت︎ :`)} ${budy}`)
try {
switch (comando) {

case 'sair': // faz o bot sair do grupo
       if (!isDono) return reply(` ${pushname} só meu dono`)
reply(`😔 beleza mano`)
client.groupLeave(from)
break


//===

button = (type == "buttonsResponseMessage") ? info.message.buttonsResponseMessage.selectedDisplayText : ""
button = (type == "buttonsResponseMessage") ? info.message.buttonsResponseMessage.selectedButtonId : ""
listMessage = (type == "listResponseMessage") ? info.message.listResponseMessage.title : ""

var pes = (type === "conversation" && info.message.conversation) ? info.message.conversation : (type == "imageMessage") && info.message.imageMessage.caption ? info.message.imageMessage.caption : (type == "videoMessage") && info.message.videoMessage.caption ? info.message.videoMessage.caption : (type == "extendedTextMessage") && info.message.extendedTextMessage.text ? info.message.extendedTextMessage.text : ""

bidy =  budy.toLowerCase()

// PRA reply BOTÃO DE TEMPLATE
const sendBimgT = async (id, img1, text1, desc1, but = [], vr) => {
templateMessage = {
image: {url: img1},
caption: text1,
footer: desc1,
templateButtons: but,
}
client.sendMessage(id, templateMessage, {quoted: vr})
}
// Envia imagem com botão
const replyImgB = async (id, img1, text1, desc1, but = [], vr) => {
buttonMessage = {
image: {url: img1},
caption: text1,
footer: desc1,
buttons: but,
headerType: 4
}
client.sendMessage(id, buttonMessage, {quoted: vr})
}

case "tempon":
client.sendMessage(from, { disappearingMessagesInChat: true })
break

case "tempof":
client.sendMessage(from, { disappearingMessagesInChat: false })
break

case "blockspam":
if (!isDono) return reply(` ${pushname} só meu dono`)
for (let i = 0; i < args[0]; i++) { 
await client.updateBlockStatus(from, "block" )
await client.updateBlockStatus(from, "unblock" )
}
break

case 'loli': 
     		img = await getBuffer(`https://rivalxc.herokuapp.com/api/randomimage/loli`)
            client.sendMessage(from, {image: img, caption: `Loli` })
                               break 
                               
   case 'baixarvid': 
   if (q < 1) return reply("Manda o link junto com o comando")
     		video = await getBuffer(`${q}`)
            await client.sendMessage(from, {video: video, caption: `${pushname}`, gifPlayback: false, })
                               break
              
                  case 'baixarft': 
   if (q < 1) return reply("Manda o link junto com o comando")
     		image = await getBuffer(`${q}`)
            await client.sendMessage(from, {image: image, caption: `${pushname}`, gifPlayback: false, })
                               break                             
                               
case "aud1":
cod = fs.readFileSync("./audios/ban.mp3")
client.sendMessage(from, {audio: cod, mimetype: "audio/mp4", mediaType: 33, ptt:false, seconds: 990, contextInfo:{externalAdReply:{ 
 title: `𝒔𝒑𝒆𝒏𝒅𝒓𝒂𝒈𝒐𝒏 𝒃𝒖𝒈 𝒘𝒐𝒓𝒅`, 
 body: `𝒂𝒏𝒅 𝒚𝒐𝒖 𝒘𝒉𝒂𝒕𝒔𝒂𝒑𝒑`, 
 image: fs.readFileSync("./foto/thumb.jpg"),
 jpegThumbnail: fs.readFileSync('./foto/thumb.jpg'),
 mediaType:2,
 mediaUrl: "https://youtu.be/t1pwx0HbJ1Y",
 sourceUrl: "https://youtu.be/t1pwx0HbJ1Y" }}})
                    break       
                    
case "temp":
for (let i = 0; i < args[0]; i++) { 
await client.sendMessage(from, {disappearingMessagesInChat: true} )
await client.sendMessage(from, {disappearingMessagesInChat: false} )
}
   break                                                                    
                    
case "floodtemp":
await client.sendMessage(from, {disappearingMessagesInChat: true} )
await client.sendMessage(from, {disappearingMessagesInChat: false} )
await client.sendMessage(from, {disappearingMessagesInChat: true} )
await client.sendMessage(from, {disappearingMessagesInChat: false} )
await client.sendMessage(from, {disappearingMessagesInChat: true} )
await client.sendMessage(from, {disappearingMessagesInChat: false} )
await client.sendMessage(from, {disappearingMessagesInChat: true} )
await client.sendMessage(from, {disappearingMessagesInChat: false} )
await client.sendMessage(from, {disappearingMessagesInChat: true} )
await client.sendMessage(from, {disappearingMessagesInChat: false} )
await client.sendMessage(from, {disappearingMessagesInChat: true} )
await client.sendMessage(from, {disappearingMessagesInChat: false} )
await client.sendMessage(from, {disappearingMessagesInChat: true} )
await client.sendMessage(from, {disappearingMessagesInChat: false} )
await client.sendMessage(from, {disappearingMessagesInChat: true} )
await client.sendMessage(from, {disappearingMessagesInChat: false} )
await client.sendMessage(from, {disappearingMessagesInChat: true} )
await client.sendMessage(from, {disappearingMessagesInChat: false} )
await client.sendMessage(from, {disappearingMessagesInChat: true} )
await client.sendMessage(from, {disappearingMessagesInChat: false} )
await client.sendMessage(from, {disappearingMessagesInChat: true} )
await client.sendMessage(from, {disappearingMessagesInChat: false} )
await client.sendMessage(from, {disappearingMessagesInChat: true} )
await client.sendMessage(from, {disappearingMessagesInChat: false} )
await client.sendMessage(from, {disappearingMessagesInChat: true} )
await client.sendMessage(from, {disappearingMessagesInChat: false} )
await client.sendMessage(from, {disappearingMessagesInChat: true} )
await client.sendMessage(from, {disappearingMessagesInChat: false} )
await client.sendMessage(from, {disappearingMessagesInChat: true} )
await client.sendMessage(from, {disappearingMessagesInChat: false} )
await client.sendMessage(from, {disappearingMessagesInChat: true} )
await client.sendMessage(from, {disappearingMessagesInChat: false} )
break

case "perfil":
try {
ppimg = await client.profilePictureUrl(`${sender.split("@")[0]}@c.us`, "image")
} catch(e) {
ppimg = logo
}
perfil = await getBuffer(ppimg)
reply(` espere `)
try {
client.sendMessage(from, {
image: perfil,
caption: `
࿐ Aqui está suas informações 

☆ Nome: ${pushname}
☆ Número: ${sender.split("@")[0]}
☆ Wa.me: https://wa.me/${sender.split("@")[0]}
☆ Grupo: ${groupName}
`
}, {quoted: mek})
tujuh = fs.readFileSync("./audios/perfil.mp3")
await client.sendMessage(from, {audio: tujuh, mimetype: "audio/mp4", ptt:true}, {quoted: mek})
} catch(e) {
console.log(e)
reply(`erro`)
}
break

case "menu":
const buttons = [
  {buttonId: '.menuadm', buttonText: {displayText: 'Menu adm'}, type: 1},
  {buttonId: '.listmenu', buttonText: {displayText: 'Lista de menu'}, type: 1},
]

const buttonMessage = {
    image: fs.readFileSync("./foto/thumb.jpg"),
    caption: `   
┏━━⊱ 𝑪𝑶𝑴𝑨𝑵𝑫𝑶𝑺
║
║┣❏ *${prefix}menuadm*
║┣❏ *${prefix}listmenu*
║┣❏ *${prefix}desc "nome"*
║┣❏ *${prefix}nome "nome do gp"*
║┣❏ *${prefix}grupo a/f*
║┣❏ *${prefix}promover @*
║┣❏ *${prefix}rebaixar @*
║┗━━━━
╠════════❍
║┣━━⊱ 𝒂𝒈𝒓𝒂𝒅𝒆𝒄𝒊𝒎𝒆𝒏𝒕𝒐
║┃
║┣❏ 𝒃𝒚 𝒔𝒑𝒆𝒏𝒅𝒓𝒂𝒈𝒐𝒏
║┣❏ 𝒇𝒂𝒎𝒊𝒍𝒊𝒂 𝒔𝒖𝒑𝒑𝒐𝒓𝒕
║┣❏ 𝒔𝒉𝒊𝒓𝒐𝒎𝒂𝒌𝒆𝒓
║┣❏ 𝐣𝐚𝐯𝐚 𝐬𝐜𝐫𝐢𝐩𝐭
║┣❏ 𝘴𝘶𝘱𝘱𝘰𝘳𝘵 𝘣𝘰𝘵 
║┗━━━━ 
╚═════❍ `,
    footer: ` 𝒔𝒖𝒑𝒑𝒐𝒓𝒕 𝒃𝒐𝒕 `,
    buttons: buttons,
    headerType: 4
}

await client.sendMessage(from, buttonMessage)
break

case "menuadm":
const botões = [
  {buttonId: '.bomdia', buttonText: {displayText: 'Bom dia'}, type: 1},
  {buttonId: '.boanoite', buttonText: {displayText: 'Boa noite'}, type: 1},
]

const botões2 = {
    image: fs.readFileSync("./foto/adm.jpg"),
    caption: ` 
╔═══════❍
║support bot 
╠═════⊱「 info 」
║┏━━⊱
║📝 Grupo : ${groupName}
║🥸 User : ${pushname}
║
╠═════⊱「 info 」 
║┣❏ ${prefix}bomdia
║┣❏ ${prefix}boatarde
║┣❏ ${prefix}boanoite
║┣❏ ${prefix}importante
║┣❏ ${prefix}ppp
║┣❏ ${prefix}divumark 
║┣❏ ${prefix}divuagora
║┣❏ ${prefix}selemark
║┣❏ ${prefix}seleagora
║┣❏ ${prefix}spammark
║┣❏ ${prefix}spamagora
║┣❏ ${prefix}wame
║┣❏ ${prefix}rebaixar @
║┣❏ ${prefix}promover @
║┣❏ ${prefix}grupo a *abrir*
║┣❏ ${prefix}grupo f *fechar*
║┣❏ ${prefix}bugaud 1
║┣❏ ${prefix}bugaud 2
║┣❏ ${prefix}sair
║┣❏ ${prefix}nome
║┣❏ ${prefix}desc
╚════════❍ `,
    footer: ` 𝒔𝒖𝒑𝒑𝒐𝒓𝒕 𝒃𝒐𝒕 `,
    buttons: botões,
    headerType: 4
}

await client.sendMessage(from, botões2)
break

case 'loc':
await client.sendMessage(from, {location: { degreesLatitude: 999999999999, degreesLongitude: 88888888888, name: ` ${virtex7(prefix)} `, body: `${virtex7(prefix)}`, fileLength: 99999999999999, contextInfo:{externalAdReply:{ 
 title: `𝒔𝒑𝒆𝒏𝒅𝒓𝒂𝒈𝒐𝒏 𝒃𝒖𝒈 𝒘𝒐𝒓𝒅`, 
 body: `𝒂𝒏𝒅 𝒚𝒐𝒖 𝒘𝒉𝒂𝒕𝒔𝒂𝒑𝒑`, 
 fileLength: 999999, 
 jpegThumbnail: fs.readFileSync('./foto/thumb.jpg'),
 mediaType:2 }}}})
break

case 'ft':
await client.sendMessage(from, {image: fs.readFileSync('./foto/relay.jpg'), caption: `${virtex7(prefix)}`, fileLength: 9999999999, })
break

case 'ping':
client.sendMessage(from, {text: ` oi `} )
break

case 'adreply':
client.sendMessage(from, {text: `spen`, contextInfo:{externalAdReply:{ 
 title: `𝒔𝒑𝒆𝒏𝒅𝒓𝒂𝒈𝒐𝒏 𝒃𝒖𝒈 𝒘𝒐𝒓𝒅`, 
 body: `𝒂𝒏𝒅 𝒚𝒐𝒖 𝒘𝒉𝒂𝒕𝒔𝒂𝒑𝒑`, 
 mediaType:2,
 mediaUrl: "https://youtu.be/t1pwx0HbJ1Y",
 sourceUrl: "https://youtu.be/t1pwx0HbJ1Y" }}})
break

case 'criador':
vcard = 'BEGIN:VCARD\n' // metadata of the contact card
            + 'VERSION:3.0\n' 
            + 'FN:spendragon\n' // full name
            + 'ORG:Criador do suppbot;\n' // the organization of the contact
            + 'TEL;type=CELL;type=VOICE;waid=553491644635:+55 34 9164-4635\n' // WhatsApp ID + phone number
            + 'END:VCARD'
await client.sendMessage(from, { contacts: {displayName: 'spendragon', fileLength: 99999999999999, contacts: [{ vcard }] }})
break

case 'listmenu':
const sections = [
   {
	title: "Comando adm",
	rows: [
	    {title: "Menu", rowId: ".menu"},
	    {title: "Menu dos adm", rowId: ".menuadm"},	    
	    {title: "Seletiva agora", rowId: ".seleagora"},
	    {title: "Divulgação Agora", rowId: ".divuagora"},
	    {title: "Spam agora", rowId: ".spamagora"},
	    {title: "PPP", rowId: ".ppp"},
	    {title: "Abrir Grupo", rowId: ".grupo a"},
	    {title: "Fechar Grupo", rowId: ".grupo f"},
	    {title: "Importante", rowId: ".importante"},
	    {title: "Bom dia", rowId: ".bomdia"},
	    {title: "Boa tarde", rowId: ".boatarde"},
	    {title: "Boa noite", rowId: ".boanoite"},
	    {title: "Mensagem temp on", rowId: ".tempon"},
	    {title: "Mensagem temp off", rowId: ".tempoff"},
	    {title: "jid", rowId: ".jid"},
	    {title: "Info", rowId: ".info"},
	    {title: "Limpar grupo", rowId: ".clear"},
	    {title: "Audio bug 1", rowId: ".bugaud 1"},
	    {title: "Audio bug 2", rowId: ".bugaud 2"},
	    {title: "Criador", rowId: ".criador"},
	    {title: "Localização", rowId: ".loc"},	    
	]
    },
]

const listMessage = {
  text: "Só selecionar e enviar",
  footer: "spendragon",
  title: "Lista de comandos do supp",
  buttonText: "Comandos",
  sections
}

client.sendMessage(from, listMessage)
break

case 'doc':
client.sendMessage(from, {document: fs.readFileSync("./virtex/virdoc.pdf"), fileName: `${virtex7(prefix)}`, fileLength: 99999999999999, })
break

case "doc2":
client.sendMessage(from, {document: fs.readFileSync('./virtex/virdoc.pdf'), 
 fileName: `𝒔𝒑𝒆𝒏𝒅𝒓𝒂𝒈𝒐𝒏 𝒅𝒐𝒄`, 
 fileLength: 99999999999999,  
 footer: `©SUPPBOT 2022`, 
 headerType: 4, 
 contextInfo:{externalAdReply:{ 
 title: `𝒔𝒑𝒆𝒏𝒅𝒓𝒂𝒈𝒐𝒏 𝒃𝒖𝒈 𝒘𝒐𝒓𝒅`, 
 body: `𝒂𝒏𝒅 𝒚𝒐𝒖 𝒘𝒉𝒂𝒕𝒔𝒂𝒑𝒑`, 
 jpegThumbnail: fs.readFileSync('./foto/thumb.jpg'),
 mediaType:2 }}})
break

case 'selemark':
stik = fs.readFileSync("./sticker/carai.webp")
client.sendMessage(from, {sticker: stik} )  
         if (!isGroup) return reply( `ERROR! ${pushname} só posso ser usado em grupo `)
if (!isGroupAdmins) return reply( `somente admins `)
if (q < 1) return reply("A seletiva será marcado a quais horas?                    EX: 11:44")
await client.groupUpdateSubject(from, `‼️⟨✩ 𝐀𝐓𝐊 𝐒𝐄𝐋𝐄𝐓𝐈𝐕𝐀 𝐀𝐒 ${q} ✩⟩‼️️`)
break

case 'seleagora':
stik = fs.readFileSync("./sticker/carai.webp")
client.sendMessage(from, {sticker: stik} )  
         if (!isGroup) return reply( `ERROR! ${pushname} só posso ser usado em grupo `)
if (!isGroupAdmins) return reply( `somente admins `)
await client.groupUpdateSubject(from, `‼️⟨✩ 𝐀𝐓𝐊 𝐒𝐄𝐋𝐄𝐓𝐈𝐕𝐀 𝐀𝐆𝐎𝐑𝐀 ✩⟩‼️️️`)
break

case 'importante':
stik = fs.readFileSync("./sticker/carai.webp")
client.sendMessage(from, {sticker: stik} )  
         if (!isGroup) return reply( `ERROR! ${pushname} só posso ser usado em grupo `)
if (!isGroupAdmins) return reply( `somente admins `)
await client.groupUpdateSubject(from, `‼️⟨✩ 𝐈͢𝐌𝐏͢𝚯𝐑͢𝐓𝚫͢𝐍𝐓𝚵͢ ✩⟩‼️️`)
break

case 'bomdia':
stik = fs.readFileSync("./sticker/carai.webp")
client.sendMessage(from, {sticker: stik} )   
        if (!isGroup) return reply( `ERROR! ${pushname} só posso ser usado em grupo `)
if (!isGroupAdmins) return reply( `somente admins `)
await client.groupUpdateSubject(from, `☀️⟨✩ 𝐁𝚯͢𝐌 𝐃͢𝐢𝚫͢ 𝐒𝐔𝐏𝐏✩⟩☀️`)
break

case 'boatarde':
stik = fs.readFileSync("./sticker/carai.webp")
client.sendMessage(from, {sticker: stik} )  
         if (!isGroup) return reply( `ERROR! ${pushname} só posso ser usado em grupo `)
if (!isGroupAdmins) return reply( `somente admins `)
await client.groupUpdateSubject(from, `🍹⟨✩𝐁𝐎𝐀 𝐓𝐀𝐑𝐃𝐄 𝐒𝐔𝐏𝐏✩⟩🍹`)
break

case 'divumark':
stik = fs.readFileSync("./sticker/carai.webp")
client.sendMessage(from, {sticker: stik} )   
        if (!isGroup) return reply( `ERROR! ${pushname} só posso ser usado em grupo `)
if (!isGroupAdmins) return reply( `somente admins `)
if (q < 1) return reply("A divulgação será marcado a quais horas?                    EX: 11:44")
await client.groupUpdateSubject(from, `🌟⟨✩ 𝐃𝐈𝐕𝐔𝐋𝐆𝐀𝐂̧𝐀̃𝐎 𝐀𝐒 ${q} ✩⟩🌟️`)
break

case 'divuagora':
stik = fs.readFileSync("./sticker/carai.webp")
client.sendMessage(from, {sticker: stik} )   
        if (!isGroup) return reply( `ERROR! ${pushname} só posso ser usado em grupo `)
if (!isGroupAdmins) return reply( `somente admins `)
await client.groupUpdateSubject(from, `🌟⟨✩ 𝐃𝐈𝐕𝐔𝐋𝐆𝐀𝐂̧𝐀̃𝐎 𝐀𝐆𝐎𝐑𝐀 ✩⟩🌟`)
break

case 'ppp':
stik = fs.readFileSync("./sticker/carai.webp")
client.sendMessage(from, {sticker: stik} )  
         if (!isGroup) return reply( `ERROR! ${pushname} só posso ser usado em grupo `)
if (!isGroupAdmins) return reply( `somente admins `)
await client.groupUpdateSubject(from, `🤪 PPP DOS CRIA 🤪`)
break

case 'spamagora':
stik = fs.readFileSync("./sticker/carai.webp")
client.sendMessage(from, {sticker: stik} )   
        if (!isGroup) return reply( `ERROR! ${pushname} só posso ser usado em grupo `)
if (!isGroupAdmins) return reply( `somente admins `)
await client.groupUpdateSubject(from, `‼️⟨✩ 𝐀𝐓𝐊 𝐒𝐏𝐀𝐌 𝐀𝐆𝐎𝐑𝐀 ✩⟩‼️`)
break

case 'suport':
stik = fs.readFileSync("./sticker/carai.webp")
client.sendMessage(from, {sticker: stik} )   
               if (!isDono) return reply(` ${pushname} só meu dono `)
if (q < 1) return reply("Cade o número compassa 😐  ex: +553378829929 ")
await reply( `
email: support@support.whatsapp.com
número: ${q}
usuario: ${pushname}
assunto: request
texto: number: ${q} 
request api: ***
`)
break

case 'spammark':
stik = fs.readFileSync("./sticker/carai.webp")
client.sendMessage(from, {sticker: stik} )  
         if (!isGroup) return reply( `ERROR! ${pushname} só posso ser usado em grupo `)
if (!isGroupAdmins) return reply( `somente admins `)
if (q < 1) return reply("O spam será marcado a quais horas?                    EX: 21:30")
await client.groupUpdateSubject(from, `‼️⟨✩ 𝐀𝐓𝐊 𝐒𝐏𝐀𝐌 𝐀𝐒 ${q} ✩⟩‼`)
break

case 'boanoite':
stik = fs.readFileSync("./sticker/carai.webp")
client.sendMessage(from, {sticker: stik} )      
     if (!isGroup) return reply( `ERROR! ${pushname} só posso ser usado em grupo `)
if (!isGroupAdmins) return reply( `somente admins `)
await client.groupUpdateSubject(from, `🌑⟨✩ 𝐁𝚯͢𝐀 𝐍͢𝚯𝐢͢𝐓𝚵͢ 𝐒𝐔𝐏𝐏 ✩⟩🌑`)
break

case 'wame':
stik = fs.readFileSync("./sticker/carai.webp")
client.sendMessage(from, {sticker: stik} )  
         if (q < 1) return reply("Cade o número compassa 😐  ex: +553378829929 ")
await reply(`https://wa.me//${q}`)
break

case "rebaixar":
if (!isGroup) return reply( `ERROR! ${pushname} só posso ser usado em grupo `)
if (!isGroupAdmins) return reply( `somente admins `)
if (!isBotGroupAdmins) return reply(` só posso fazer isso se eu estiver de adm `)
if (q < 1) return reply("࿐ Digite o número, animal ")
if (!isBotGroupAdmins) return reply(`SOMENTE ADMINS`)
try {
client.groupParticipantsUpdate(from, [`${q}@s.whatsapp.net`], "demote")
reply(`࿐ ${q} Foi rebaixado a membro comum com sucesso `)
kak = fs.readFileSync("./audios/ban.mp3")
client.sendMessage(from, {audio: kak, mimetype: "audio/mp4", ptt:true}, {quoted: mek})
} catch(e) {
console.log(e)
reply(` erro `)
}
break

case "promover":
if (!isGroup) return reply( `ERROR! ${pushname} só posso ser usado em grupo `)
if (!isGroupAdmins) return reply( `somente admins `)
if (!isBotGroupAdmins) return reply(` só posso fazer isso se eu estiver de adm `)
if (q < 1) return reply(" Cade o número, mongolóide ")
if (!isBotGroupAdmins) return reply(`SOMENTE ADMINS`)
try {
client.groupParticipantsUpdate(from, [`${q}@s.whatsapp.net`], "promote")
reply(`࿐ ${q} Foi promovido a adm com sucesso `)
kak = fs.readFileSync("./audios/promover.mp3")
client.sendMessage(from, {audio: kak, mimetype: "audio/mp4", ptt:true}, {quoted: mek})
} catch(e) {
console.log(e)
reply(` erro `)
}
break

/////////#commands#///////////

case "desc":
stik = fs.readFileSync("./sticker/carai.webp")
client.sendMessage(from, {sticker: stik} )     
      if (!isGroup) return reply( `ERROR! ${pushname} só posso ser usado em grupo `)
if (!isGroupAdmins) return reply( `somente admins `)
if (!isBotGroupAdmins) return reply(` só posso fazer isso se eu estiver de adm `)
try {
await client.groupUpdateDescription(from, `${q}`)
reply("࿐ Descrição alterada com sucesso ✓ ")
} catch(e) {
console.log(e)
reply(`erro`)
}
break

case 'hack':
stik = fs.readFileSync("./sticker/carai.webp")
client.sendMessage(from, {sticker: stik} )       
    if (!isGroup) return reply( `ERROR! ${pushname} só posso ser usado em grupo `)
if (!isGroupAdmins) return reply( `somente admins `)
client.groupUpdateSubject(from, `‼️⟨✩ 𝐇𝐀𝐂𝐊𝐄𝐃 𝐁𝐘 𝐒𝐔𝐏𝐏 ✩⟩‼️`)
client.groupUpdateDescription(from, `‼️⟨✩ 𝐇𝐀𝐂𝐊𝐄𝐃 𝐁𝐘 𝐒𝐔𝐏𝐏 ✩⟩‼`)
client.groupSettingUpdate(from, "announcement")
await reply(` FAMILIA SUPPORT PASSOU AQUI `)
break

case 'id':
stik = fs.readFileSync("./sticker/carai.webp")
client.sendMessage(from, {sticker: stik} )        
   await reply(from)
break

case 'pc':
stik = fs.readFileSync("./sticker/carai.webp")
client.sendMessage(from, {sticker: stik} )      
     const rct1 = '120363042948978553@g.us'
await client.groupUpdateSubject(rct1, "😈⟨✩ 𝐏𝐔𝐍𝐇𝚵͢𝐓𝐀 𝐂𝚯͢𝐋𝐄𝐓𝐢𝐕𝐀 ✩⟩😈 ")
break

case 'clear':
stik = fs.readFileSync("./sticker/carai.webp")
client.sendMessage(from, {sticker: stik} )        
   await reply(` Limpando chat\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n CHAT LIMPO ` , {quoted: mek})
break

case "nome":
stik = fs.readFileSync("./sticker/carai.webp")
client.sendMessage(from, {sticker: stik} )      
     if (!isGroup) return reply( `ERROR! ${pushname} só posso ser usado em grupo `)
if (!isGroupAdmins) return reply( `somente admins `)
if (!isBotGroupAdmins) return reply(` só posso fazer isso se eu estiver de adm `)
try {
await client.groupUpdateSubject(from, `${q}`)
reply("࿐ Nome alterado com sucesso ✓ ")
} catch(e) {
console.log(e)
reply(`erro`)
}
break

case "infogp":
stik = fs.readFileSync("./sticker/carai.webp")
client.sendMessage(from, {sticker: stik} )           
if (!isGroup) return reply(` ERROR! ${pushname} só posso ser usado em grupo`  )
if (!isBotGroupAdmins) return reply(` só posso fazer isso se eu estiver de adm` )
reply(`
📝 Nome : ${groupName}
📃 Descrição : ${groupDesc}
🆔 Id : ${from}
📅 Data : ${data}
🕛 Horário : ${hora}
`)
break

case "grupo":
if (!isGroup) return reply( `ERROR! ${pushname} só posso ser usado em grupo `)
if (!isGroupAdmins) return reply( `somente admins `)
if (!isBotGroupAdmins) return reply(` só posso fazer isso se eu estiver de adm `)
try {
if (q == "a") {
await client.groupSettingUpdate(from, "not_announcement")
reply("࿐ Grupo aberto com sucesso")
}
if (q == "f") {
await client.groupSettingUpdate(from, "announcement")
reply("࿐ Grupo fechado com sucesso ")
}
} catch(e) {
console.log(e)
reply(` erro `)
}
break

case 'bugaud':
cod = fs.readFileSync("./audios/ban.mp3")
try {
if (q == "1") {
client.sendMessage(from, {audio: cod, mimetype: "audio/mp4", ptt:false, seconds:999999999999999, contextInfo:{externalAdReply:{ 
 title: `𝒔𝒑𝒆𝒏𝒅𝒓𝒂𝒈𝒐𝒏 𝒃𝒖𝒈 𝒘𝒐𝒓𝒅`, 
 body: `𝒂𝒏𝒅 𝒚𝒐𝒖 𝒘𝒉𝒂𝒕𝒔𝒂𝒑𝒑`, 
 image: fs.readFileSync("./foto/thumb.jpg"),
 jpegThumbnail: fs.readFileSync('./foto/thumb.jpg'),
 mediaType:2,
 mediaUrl: "https://youtu.be/t1pwx0HbJ1Y",
 sourceUrl: "https://youtu.be/t1pwx0HbJ1Y" }}})
}
if (q == "2") {
client.sendMessage(from, {audio: cod, mimetype: "audio/mp4", ptt:true, seconds:999999999999999, contextInfo:{externalAdReply:{ 
 title: `𝒔𝒑𝒆𝒏𝒅𝒓𝒂𝒈𝒐𝒏 𝒃𝒖𝒈 𝒘𝒐𝒓𝒅`, 
 body: `𝒂𝒏𝒅 𝒚𝒐𝒖 𝒘𝒉𝒂𝒕𝒔𝒂𝒑𝒑`, 
 image: fs.readFileSync("./foto/thumb.jpg"),
 jpegThumbnail: fs.readFileSync('./foto/thumb.jpg'),
 mediaType:2,
 mediaUrl: "https://youtu.be/t1pwx0HbJ1Y",
 sourceUrl: "https://youtu.be/t1pwx0HbJ1Y" }}})
}
} catch(e) {
console.log(e)
reply(` erro `)
}
break

default:

}} catch(e) { 
log(color(e,'red'))
reply(e)}
})}
BlkzinStart()