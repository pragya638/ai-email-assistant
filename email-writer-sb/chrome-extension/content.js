console.log("AI Email Assistant Loaded");


const button = document.createElement("button");

button.innerText = "🤖 Generate AI Reply";

button.style.position = "fixed";
button.style.bottom = "20px";
button.style.left = "20px";
button.style.zIndex = "99999";
button.style.padding = "12px 20px";
button.style.background = "#1976d2";
button.style.color = "white";
button.style.border = "none";
button.style.borderRadius = "8px";
button.style.cursor = "pointer";
button.style.fontSize = "14px";
button.style.fontWeight = "bold";

button.onclick = async () => {

    try {

        
        const tone = prompt(
            "Choose Tone:\n\nprofessional\nfriendly\nformal\nshort",
            "professional"
        );

        if (!tone) {
            return;
        }

       

        const emailBody = document.querySelector(".a3s");

        if (!emailBody) {
            alert("Please open an email first.");
            return;
        }

        const emailContent = emailBody.innerText;

        console.log("Email Content:");
        console.log(emailContent);

        button.innerText = "Generating...";
        button.disabled = true;

        
        const response = await fetch(
            "http://localhost:8081/api/email/generate",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    emailContent: emailContent,
                    tone: tone
                }),
            }
        );

        if (!response.ok) {
            throw new Error("Backend API Error");
        }

        const generatedReply = await response.text();

        console.log("Generated Reply:");
        console.log(generatedReply);

        

        const replyBox = document.querySelector(
            'div[role="textbox"][g_editable="true"]'
        );

        if (!replyBox) {
            alert("Please click Reply first.");
            return;
        }

        
        replyBox.focus();

        replyBox.innerHTML = "";

        generatedReply.split("\n").forEach(line => {
            const div = document.createElement("div");
            div.textContent = line;
            replyBox.appendChild(div);
        });

        alert("AI Reply Inserted Successfully!");

    } catch (error) {

        console.error("Error:", error);
        alert("API Call Failed");

    } finally {

        button.innerText = "🤖 Generate AI Reply";
        button.disabled = false;

    }
};



document.body.appendChild(button);