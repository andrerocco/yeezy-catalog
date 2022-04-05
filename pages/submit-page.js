let table = document.querySelector('.table-container');
table.addEventListener('mouseover', function injectExampleText(){
    document.querySelector('#table-top td').innerHTML = "Outfit submission - Romerio Castro";
    document.querySelector('#table-bottom td').innerHTML = `
    Instagram: @romeriocastro
    <br>Yeezy: Yeezy 700 v2
    <br>Colorway: Static
    <br>
    <br>https://www.instagram.com/p/CbA_zA2PxTV/
    <br>Click to copy to the base email
    `
    document.querySelector('#table-top th').innerHTML = "Example subject:"
    document.querySelector('#table-bottom th').innerHTML = "Example body:"

    table.addEventListener('click', function(){
        document.querySelector('#table-bottom td').innerHTML = `
        Instagram: @romeriocastro
        <br>Yeezy: Yeezy 700 v2
        <br>Colorway: Static
        <br>
        <br>https://www.instagram.com/p/CbA_zA2PxTV/
        <br>Base email copied
        `
    })
})
table.addEventListener('mouseout', function cleanExampleText(){
    document.querySelector('#table-top td').innerHTML = "Outfit submission - Your name";
    document.querySelector('#table-bottom td').innerHTML = `
    Instagram: @yourusername
    <br>Yeezy: yeezy model used on the picture
    <br>Colorway: colorway of that yeezy model
    <br>
    <br>If the image is posted on instagram, include the link to it at the end of the email.
    <br>If the image is not posted on instagram, include the image in the email.
    `;
    document.querySelector('#table-top th').innerHTML = "Subject:"
    document.querySelector('#table-bottom th').innerHTML = "In the body<br>of the email:"
})


