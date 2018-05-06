import axios from 'axios'

module.exports = class Contact {

  constructor() {
    this.form = document.getElementById('contactform')

    if (this.form.length == -1) return

    this.form.addEventListener('submit', (e) => {
      this.submit(e)
    })
  }

  submit(event) {
    event.preventDefault()
    
    let data = new FormData();
    
    this.form.querySelectorAll('input, textarea').forEach((element) => {
      data.append(element.name, element.value)
    })

    this.success()

    // axios
    //   .request({
    //     method: 'POST',
    //     headers: {
    //       'content-type': `multipart/form-data; boundary=${data._boundary}`,
    //       'accept': 'application/json'
    //     },
    //     data: data,
    //     url: 'https://formcarry.com/s/ryPHDtKTf'
    //   })
    //   .then((response) => {
    //     if (response.status === 200) this.success()
    //   })

    return false
  }

  success() {
    let pane = document.getElementById('success')
    let slide = document.getElementById('slide')
    let width = this.form.offsetWidth

    pane.style.width = width + 'px'
    pane.style.left = (0 - (width + 50)) + 'px'
    pane.style.display = 'flex'
    slide.style.left = width + 50 + 'px'
  }

  failure() {

  }
}