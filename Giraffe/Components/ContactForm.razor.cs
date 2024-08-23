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
            Message = "��������� ��� ����";
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
    }
}