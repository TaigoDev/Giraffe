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
            Message = "��������� ��� ����";
            await OnCancel();
            return;
        }

        await MailService.NewMail(
            $"""
            <p> ������������ ����� ������� ����� ������: </p>
            <p> ���: {FirstName} </p>
            <p> �������: {Telephone} </p>
            <p> �����: {Email} </p>
            """,
            "����� ����������� � �����"
            );
        Message = "������ ������� ����������";
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