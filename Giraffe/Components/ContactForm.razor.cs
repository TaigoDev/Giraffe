using Giraffe.Services;
using Microsoft.AspNetCore.Components;

namespace Giraffe.Components;

public partial class ContactForm : ComponentBase
{
    private string? FirstName { get; set; }
    private string? Telephone { get; set; }
    private string? Email { get; set; }

    private string? Message { get; set; } = null;

    private async Task OnSubmit()
    {
        if(string.IsNullOrWhiteSpace(FirstName) || string.IsNullOrWhiteSpace(Telephone) || string.IsNullOrWhiteSpace(Email))
        {
            Message = "Заполните все поля";
            return;
        }

        await MailService.NewMail(
            $"""
            <p> Пользователь сайта оставил новую заявку: </p>
            <p> Имя: {FirstName} </p>
            <p> Телефон: {Telephone} </p>
            <p> Почта: {Email} </p>
            """,
            "Новое уведомление с сайта"
            );
        Message = "Заявка успешно отправлена";
    }
}