const testData = { data: "nodejs api"}


//business logics 
//read home page data
export const welcomeMsg = (req, res) =>{
    res.json(testData)};

//create user data in db
export const preRegister = (req, res) => {
    // create jwt with email and password then email as clickable link
    // only when user click on that email link, registeration completes
    try {
        console.log(req.body)

        const emailSent = true;
        if (emailSent) {
        console.log("Check email to complete registration");
        return res.json({ ok: true });
        } else {
        console.log("Provide a valid email address");
        return res.json({ ok: false });
        }
    } catch (err) {
        console.log(err)
        return res.json({error: "something went wrong"})
    }
}