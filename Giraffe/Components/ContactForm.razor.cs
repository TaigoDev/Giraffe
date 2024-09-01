using Giraffe.Services;
using Microsoft.AspNetCore.Components;

namespace Giraffe.Components;

public partial class ContactForm : ComponentBase
{
    private string? FirstName { get; set; }
    private string? Telephone { get; set; }
    private string? Email { get; set; }

    private string? Message { get; set; } 
    private string? Class { get; set; }
    private bool HideForm { get; set; } 

    private async Task OnSubmit()
    {
        if(string.IsNullOrWhiteSpace(FirstName) || string.IsNullOrWhiteSpace(Telephone) || string.IsNullOrWhiteSpace(Email))
        {
            Message = "Заполните все поля";
            await OnCancel();
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
        HideForm = true;
        await OnCancel();
    }

    private async Task OnCancel()
    {
        StateHasChanged();
        await Task.Delay(3000);
        Class = "exit";
        StateHasChanged();
        await Task.Delay(1000);
        HideForm = false;
        Message = null;
        Class = null;
    }
}