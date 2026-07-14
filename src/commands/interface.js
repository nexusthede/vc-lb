const {
    EmbedBuilder,
    PermissionFlagsBits,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle
} = require("discord.js");

const config = require("../config");


module.exports = {

    name: "interface",
    aliases: ["panel"],


    async execute(client, message, args){


        if(
            !message.member.permissions.has(
                PermissionFlagsBits.Administrator
            )
        ){

            return message.channel.send({

                embeds:[

                    new EmbedBuilder()

                    .setColor(config.errorColor)

                    .setDescription(
                        `<:x_failed:1526498753798738010> You must be an administrator to use this command.`
                    )

                ]

            });

        }



        const embed = new EmbedBuilder()

        .setColor(config.embedColor)

        .setTitle("VoiceMaster Interface")

        .setURL("https://example.com/")

        .setThumbnail(
            message.guild.iconURL({ dynamic:true })
        )

        .setDescription(
`Use the controls below to manage your voice channel.

**Commands**
> <:vc_lock:1526495431150800996> [\`Lock\`](https://example.com/) - Lock your room
> <:vc_unlock:1526495168130318348> [\`Unlock\`](https://example.com/) - Unlock your room
> <:vc_hide:1526495330269663362> [\`Hide\`](https://example.com/) - Hide your room
> <:vc_reveal:1526495525195485305> [\`Reveal\`](https://example.com/) - Reveal your room
> <:vc_rename:1526564429339299944> [\`Rename\`](https://example.com/) - Change your room name
> <:vc_limit:1526573445326966866> [\`Limit\`](https://example.com/) - Set your room user limit
> <:vc_permit:1526564717965869076> [\`Permit\`](https://example.com/) - Allow a user to join
> <:vc_reject:1526568150210973706> [\`Reject\`](https://example.com/) - Block a user from joining
> <:vc_transfer:1526564886010658917> [\`Transfer\`](https://example.com/) - Transfer room ownership
> <:vc_claim:1526564667055542453> [\`Claim\`](https://example.com/) - Claim ownership of an abandoned room`
        );



        const row1 = new ActionRowBuilder()

        .addComponents(

            new ButtonBuilder()
            .setCustomId("vc_lock")
            .setEmoji("1526495431150800996")
            .setStyle(ButtonStyle.Secondary),

            new ButtonBuilder()
            .setCustomId("vc_unlock")
            .setEmoji("1526495168130318348")
            .setStyle(ButtonStyle.Secondary),

            new ButtonBuilder()
            .setCustomId("vc_hide")
            .setEmoji("1526495330269663362")
            .setStyle(ButtonStyle.Secondary),

            new ButtonBuilder()
            .setCustomId("vc_reveal")
            .setEmoji("1526495525195485305")
            .setStyle(ButtonStyle.Secondary),

            new ButtonBuilder()
            .setCustomId("vc_rename")
            .setEmoji("1526564429339299944")
            .setStyle(ButtonStyle.Secondary)

        );



        const row2 = new ActionRowBuilder()

        .addComponents(

            new ButtonBuilder()
            .setCustomId("vc_limit")
            .setEmoji("1526573445326966866")
            .setStyle(ButtonStyle.Secondary),

            new ButtonBuilder()
            .setCustomId("vc_permit")
            .setEmoji("1526564717965869076")
            .setStyle(ButtonStyle.Secondary),

            new ButtonBuilder()
            .setCustomId("vc_reject")
            .setEmoji("1526568150210973706")
            .setStyle(ButtonStyle.Secondary),

            new ButtonBuilder()
            .setCustomId("vc_transfer")
            .setEmoji("1526564886010658917")
            .setStyle(ButtonStyle.Secondary),

            new ButtonBuilder()
            .setCustomId("vc_claim")
            .setEmoji("1526564667055542453")
            .setStyle(ButtonStyle.Secondary)

        );



        return message.channel.send({

            embeds:[
                embed
            ],

            components:[
                row1,
                row2
            ]

        });

    }

};
