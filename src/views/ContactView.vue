<template>
    <div class="container-fluid">
        <div class="row justify-content-center">
            <h2>Contact Us</h2>
        <form
          action="https://formspree.io/f/xovabvoz"
          method="POST"
          class="rmform form-control mt-3"
        >
          <label>Name:</label>
          <input
            class="name form-control"
            placeholder="Full Name"
            type="text"
            required
          />
          <label>Email:</label>
          <input
            class="email form-control"
            placeholder="Email Address"
            type="email"
            required
          /><label>Your Message:</label>
          <textarea
            name="message"
            class="form-control"
            id="message"
            placeholder="Let's have a conversation."
            required
          ></textarea>

          <div class="row gap-2 formbuttons justify-content-center">
            <button type="submit">Submit</button>
            <button type="reset">Clear</button>
          </div>
        </form>
      </div>
    </div>
</template>

<script>
export default {
    name: 'ContactView'
}
</script>

<style scoped> 
.container-fluid {
    min-height: 100vh;
}
input,
textarea {
  caret-color: #FFA500;
  min-height: 3rem;
  max-width: 50vw;
  min-width: 15rem;
  text-align: center;
  background-color: #d3d3d3;
}

#message {
  height: 6rem;
}
.rmform {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  color: #FFA500;
  width: fit-content;
  max-width: 90%;
  padding-inline: 4rem; 
  padding-block: 2rem;
}
.formbuttons {
  width: 100%;
  & button {
    padding-inline: 6px;
    height: 3rem;
    max-width: 50vw;
    margin-inline: 0;
    border-radius: 0.5rem;
    border: 1px solid #d3d3d3;
    background-color: #FFA500;
    color: #2C3E50;
    &:hover {
      color: #FFA500;
      background-color: #2C3E50;
    }
  }
}
form {
    background-image: linear-gradient(180deg, #2C3E50 65%,#2c2c2c)
}
</style>
