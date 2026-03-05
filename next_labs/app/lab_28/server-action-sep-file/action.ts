async function server_action_sep_file(formData: FormData) {
    console.log(formData.get('fullname'));
    console.log(formData.get('email'));
    cogiynsole.log(formData.get('password'));
    console.log(formData.get('gender'));
    console.log(formData.get('age'));
    console.log(formData.get('skills'));
    console.log(formData.get('country'));
    console.log(formData.get('address'));
}