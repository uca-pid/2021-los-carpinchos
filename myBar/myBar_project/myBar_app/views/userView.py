from django.core.mail import send_mail
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.response import Response
from django.http import HttpResponse

from ..models.securityCode import SecurityCode
from ..models.user import Mb_user

import myBar_project

EMAIL_HOST_USER = myBar_project.settings.EMAIL_HOST_USER

password = openapi.Schema(title='password', type=openapi.TYPE_STRING)
email = openapi.Schema(title='email', type=openapi.TYPE_STRING)
manager = openapi.Schema(title='manager', type=openapi.TYPE_STRING)
name = openapi.Schema(title='name', type=openapi.TYPE_STRING)
productName = openapi.Schema(title='productName', type=openapi.TYPE_STRING)
price = openapi.Schema(title='price', type=openapi.TYPE_INTEGER)
accountId = openapi.Schema(title='price', type=openapi.TYPE_INTEGER)


def index(request):
    return HttpResponse("API myBar.")


@swagger_auto_schema(method='post',
                     request_body=openapi.Schema(
                         type=openapi.TYPE_OBJECT,  # object because the data is in json format
                         required=['version'],
                         properties={
                             'name': name,
                             'email': email,
                             'password': password,
                             'manager': manager
                         }
                     ), responses={201: 'User created', 400: 'Invalid data', 409: "User already exits"})
@api_view(['POST'])
def user_create(request):
    try:
        user = Mb_user(**request.data)
        user.save()
        return Response({'email': user.email}, status=status.HTTP_201_CREATED)
    except Exception as e:
        if str(e) == "El usuario ya existe":
            return Response(status=status.HTTP_409_CONFLICT)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)


@swagger_auto_schema(method='post',
                     request_body=openapi.Schema(
                         type=openapi.TYPE_OBJECT,  # object because the data is in json format
                         required=['version'],
                         properties={
                             'name': name,
                             'email': email,
                         }
                     ), responses={200: 'User created', 400: 'Invalid data'})
@api_view(['POST'])
def user_log_in(request):
    user = Mb_user.users.filter(email=request.data.get('email'))
    user2 = user.first()

    if user:
        password = user2.password
        if password == request.data.get('password'):
            return Response(
                {'name': user2.name, 'id': user2.account_id, 'manager': user2.manager, 'email': user2.email},
                status=status.HTTP_200_OK)

    else:
        return Response(status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def allow_password_reestablishment(request):
    user = Mb_user.users.filter(email=request.data.get('email'))
    user2 = user.first()
    if user2:
        SecurityCode.delete(user2)
        try:
            security_code = SecurityCode.create(user2)
            security_code.full_clean()
            security_code.save()
            sendEmail(request.data.get('email'), security_code.security_code)

            return Response(status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'message': str(e)}, status=status.HTTP_400_BAD_REQUEST)
    else:
        return Response({'message': "La cuenta ingresada no es valida."}, status=status.HTTP_404_NOT_FOUND)


@api_view(['POST'])
def validate_code(request):
    user = Mb_user.users.filter(email=request.data.get('email'))
    user2 = user.first()
    security_code = SecurityCode.getAllSecurityCodes().filter(account=user2)
    security_code2 = security_code.first()
    if security_code2:
        if security_code2.security_code == int(request.data.get('code')):
            security_code2.delete(user2)
            return Response({'message': "C??digo validado ??xitosamente."}, status=status.HTTP_200_OK)
        else:
            return Response({'message': "C??digo Incorrento."}, status=status.HTTP_400_BAD_REQUEST)
    else:
        return Response({'message': "No se ha generado un c??digo para esta cuenta."}, status=status.HTTP_404_NOT_FOUND)


@api_view(['PUT'])
def reestablish_password(request):
    user = Mb_user.users.filter(email=request.data.get('email'))
    user2 = user.first()
    if user2:
        try:
            user2 = user2.modifyUser(**{'password': request.data.get('newPassword')})
            user2.full_clean()
            user2.save()

            return Response({'message': "Contrase??a reestablecida."}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'message': str(e)}, status=status.HTTP_400_BAD_REQUEST)
    else:
        return Response({'message': "Cuenta no encontrada."}, status=status.HTTP_404_NOT_FOUND)


@swagger_auto_schema(method='put',
                     request_body=openapi.Schema(
                         type=openapi.TYPE_OBJECT,  # object because the data is in json format
                         required=['version'],
                         properties={
                             'name': name,
                             'email': email,
                             'password': password,
                             'manager': manager
                         }
                     ), responses={204: 'Details updated', 400: 'Invalid data'})
@api_view(['PUT'])
def modify_user_details(request, id):
    user = Mb_user.users.filter(account_id=id)
    user2 = user.first()
    if user2:
        try:
            user2 = user2.modifyUser(**(request.data))
            user2.full_clean()
            user2.save()
            return Response({'name': user2.name, 'manager': user2.manager, 'email': user2.email},
                            status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'message': str(e)}, status=status.HTTP_400_BAD_REQUEST)
    else:
        return Response(status=status.HTTP_404_NOT_FOUND)


@swagger_auto_schema(method='get',
                     responses={204: 'Details updated', 400: 'Invalid data'})
@api_view(['GET'])
def get_user_details(request, id):
    user_bis = Mb_user.getAllUsers().filter(account_id=id)
    user2 = user_bis.first()
    if user_bis:
        return Response({'name': user2.name, 'id': user2.account_id, 'manager': user2.manager, 'email': user2.email},
                        status=status.HTTP_200_OK)
    else:
        return Response(status=status.HTTP_404_NOT_FOUND)


@swagger_auto_schema(method='delete',
                     request_body=openapi.Schema(
                         type=openapi.TYPE_OBJECT,  # object because the data is in json format
                         required=['version'],
                         properties={
                             'name': name,
                             'email': email,
                             'password': password,
                             'manager': manager
                         }
                     ), responses={201: 'User deleted', 404: 'user not found'})
@api_view(['DELETE'])
def delete_user(request, id):
    try:
        Mb_user.delete(id)
        return Response(status=status.HTTP_200_OK)
    except Exception as e:
        return Response(status=status.HTTP_404_NOT_FOUND)


def sendEmail(email_receiver, security_code):
    subject = 'Password Reset'
    message = 'This email is being send because a password reset was requested. If that is not the case , let us know. Your security code is : ' + str(
        security_code)
    send_mail(subject, message, EMAIL_HOST_USER, [email_receiver], fail_silently=False)
