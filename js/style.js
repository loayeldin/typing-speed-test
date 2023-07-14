let typingText = document.querySelector(".typing-text p"),
    inputField = document.querySelector(".wrapper .input-field"),
    charIndex = mistakes= 0,
    mistakeTag = document.querySelector(".mistake span"),
    timeTag = document.querySelector(".time span b"),
    maxTime=60,
    timeLeft=maxTime,
    timer,
    isTyping = false,
    cpmTag = document.querySelector(".cpm span"),
    wpmTag = document.querySelector(".wpm span"),
    tryAgainBtn = document.querySelector("button")

function randomParagraph()
{
    console.log(typingText)
    let randIndex = Math.floor(Math.random() * paragraphs.length )
    typingText.innerHTML=""
   paragraphs[randIndex].split("").forEach(span=>{
        
        let spanTag = `<span>${span}</span>`
        // console.log(spanTag)
        typingText.innerHTML += spanTag
    })

    document.addEventListener("keydown" , ()=>{inputField.focus()})
    inputField.addEventListener("click" , ()=>{inputField.focus()})

}

function initTyping()
{
    const characters = typingText.querySelectorAll("span")
    let typedChar = inputField.value.split("")[charIndex]
   
    if( charIndex < characters.length -1 && timeLeft > 0)
    {
        if(isTyping == false)
        { // once timer is start it wont restart again every key clicked
            console.log(!isTyping)
            timer = setInterval(initTimer,1000)
            isTyping = true
        }
      
        if(typedChar == null) // if user hasn't entered any character or pressed backspace
        {
            charIndex--;
            if(characters[charIndex].classList.contains("incorrect"))
            {
                mistakes--
            }
            characters[charIndex].classList.remove("correct", "incorrect")
        }
        else{ 
            if(characters[charIndex].innerText === typedChar)
            {
                characters[charIndex].classList.add("correct")
                console.log('correct')
            }else 
            {
                mistakes++
                characters[charIndex].classList.add("incorrect")
    
                console.log('incorrect')
            }
            charIndex++
        }
      
        characters.forEach(span=>{span.classList.remove("active")})
        characters[charIndex].classList.add("active")
    
    
        let wpm = Math.round(((charIndex - mistakes)  / 5) / (maxTime - timeLeft) * 60);
        wpm = wpm <0 || !wpm || wpm === Infinity ? 0 :wpm
        mistakeTag.innerText = mistakes
        wpmTag.innerText = wpm
        cpmTag.innerText = charIndex - mistakes
    }else
    {
        inputField.value=""
        clearInterval(timer)
    }
}

function initTimer()
{
    if(timeLeft > 0)
    {
        timeLeft--
        timeTag.innerText = timeLeft
    }else
    {
        clearInterval(timer)
    }
}

function resetGame()
{
    randomParagraph();
    inputField.value=""
    clearInterval(timer)
    charIndex = mistakes= 0
    isTyping=false
    mistakeTag.innerText = mistakes
    timeLeft= maxTime
    timeTag.innerText = timeLeft
    wpmTag.innerText = 0
    cpmTag.innerText = 0

}
randomParagraph()
inputField.addEventListener("input" , initTyping)
tryAgainBtn.addEventListener("click", resetGame)








spansTime = document.querySelectorAll('.typing-setting span')

spansTime.forEach(span=>{
    span.addEventListener('click', function() {
        // Remove the clicked class from all span elements
        spansTime.forEach(span => {
          span.classList.remove('clicked');
        });
    
        // Add the clicked class to the currently clicked span element
        this.classList.add('clicked');
    
        // Retrieve the value of the clicked span element
        timeTag.innerText= maxTime = timeLeft = this.textContent;
    
        resetGameTimer()
        // Use the value as needed (e.g., store it in a variable or perform some action)
      
      });
})

function resetGameTimer()
{
    
    inputField.value=""
    clearInterval(timer)
    charIndex = mistakes= 0
    isTyping=false
    mistakeTag.innerText = mistakes
    timeLeft= maxTime
    timeTag.innerText = timeLeft
    wpmTag.innerText = 0
    cpmTag.innerText = 0

}