from random import randint

from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from datetime import date

# Импорты из твоих модулей:
from machines.models import Machine
from maintenance.models import Maintenance
from claims.models import Claim
from handbook.models import HandbookModel

User = get_user_model()

DATA = {
    'MachineModel': [
        {'name': 'X50', 'description': 'Лёгкий трёхтонный вилочный погрузчик с электрическим приводом.'},
        {'name': 'X60', 'description': 'Четырёхтонный дизельный погрузчик для работы в закрытых помещениях.'},
        {'name': 'X70', 'description': 'Погрузчик средней грузоподъёмности (7 т) с гидростатической трансмиссией.'},
    ],
    'EngineModel': [
        {'name': 'D-100', 'description': '3,0 L бензиновый двигатель, 24 кВт, для лёгких погрузчиков.'},
        {'name': 'D-120', 'description': '3,5 L дизельный двигатель, 30 кВт, для универсальных моделей.'},
        {'name': 'D-140', 'description': '4,2 L дизельный двигатель, 38 кВт, повышенной экономичности.'},
    ],
    'TransmissionModel': [
        {'name': 'T-200', 'description': 'Механическая 5-ступенчатая КПП с синхронизаторами.'},
        {'name': 'T-220', 'description': 'Автоматическая гидромеханическая трансмиссия 4-ступени.'},
        {'name': 'T-240', 'description': 'Вариатор с бесступенчатым изменением передаточного отношения.'},
    ],
    'DrivingAxleModel': [
        {'name': 'DA-300', 'description': 'Мост с нагрузкой до 5 000 кг, встроенный редуктор, планетарный.'},
        {'name': 'DA-320', 'description': 'Усиленный мост до 7 000 кг с демпфером ударных нагрузок.'},
        {'name': 'DA-340', 'description': 'Мост повышенной проходимости для работы на неровных поверхностях.'},
    ],
    'SteeringAxleModel': [
        {'name': 'SA-150', 'description': 'Простой мост с шарнирным рулевым механизмом.'},
        {'name': 'SA-160', 'description': 'Гидравлический рулевой мост с усилителем.'},
        {'name': 'SA-170', 'description': 'Мост с электронным управлением углом поворота руля.'},
    ],
    'MaintenanceType': [
        {'name': 'Плановое ТО 1', 'description': 'Ежеквартальное базовое ТО: проверка уровней, смазка, визуальный осмотр.'},
        {'name': 'Плановое ТО 2', 'description': 'Полугодовое ТО с заменой фильтров, диагностика гидросистемы.'},
        {'name': 'Капитальный ремонт', 'description': 'Капитальный ремонт узлов: разборка, дефектовка, замена изношенных деталей.'},
    ],
    'FailureNode': [
        {'name': 'Гидравлическая система', 'description': 'насос, клапаны, магистрали.'},
        {'name': 'Двигатель', 'description': 'топливная система, головка блока, поршневая группа.'},
        {'name': 'Трансмиссия', 'description': 'редукторы, фрикционы, сцепление.'},
    ],
    'RecoveryMethod': [
        {'name': 'Замена насоса', 'description': 'Замена гидронасоса целиком с тестированием системы под давлением.'},
        {'name': 'Ремонт головки блока цилиндров', 'description': 'Ремонт или расточка головки блока цилиндров с заменой прокладок.'},
        {'name': 'Капитальный ремонт коробки передач', 'description': 'Полная разборка и переборка редуктора, шестерён, подшипников.'},
    ],
}


class Command(BaseCommand):
    help = 'Создаёт тестовые данные: пользователи, справочники, машины, ТО и рекламации'

    def handle(self, *args, **kwargs):
        # === Менеджер === #
        manager = User.objects.create_user(username='Менеджер', password='pass1234', is_staff=True)
        manager.role = 'manager'
        manager.save()

        handbook = {}
        # === Справочники === #
        for handbook_type in DATA.keys():
            handbook[handbook_type] = []
            for i in DATA[handbook_type]:
                handbook[handbook_type].append(HandbookModel.objects.create(
                    type=handbook_type,
                    name=i['name'],
                    description=i['description'],
                ))


        for num in range(2):
            # === Клиент === #
            client = User.objects.create_user(username=f'ООО "Клиент {num+1}"', password='pass1234')
            client.role = 'client'
            client.save()

            # === Сервисная компания === #
            service = User.objects.create_user(username=f'ООО "Сервис {num+1}"', password='pass1234')
            service.role = 'service'
            service.save()

            # === Машины + ТО + Рекламации ===
            for i in range(2):
                machine = Machine.objects.create(
                    serial_number_machine=f"{handbook['MachineModel'][i+num].name}_{randint(1, 100)}",
                    machine_model=handbook['MachineModel'][i+num],
                    engine_model=handbook['EngineModel'][i+num],
                    serial_number_engine=f"{handbook['EngineModel'][i+num].name}_{randint(1, 100)}",
                    transmission_model=handbook['TransmissionModel'][i+num],
                    serial_number_transmission=f"{handbook['TransmissionModel'][i+num].name}_{randint(1, 100)}",
                    driving_axle_model=handbook['DrivingAxleModel'][i+num],
                    serial_number_driving_axle=f"{handbook['DrivingAxleModel'][i+num].name}_{randint(1, 100)}",
                    steering_axle_model=handbook['SteeringAxleModel'][i+num],
                    serial_number_steering_axle=f"{handbook['SteeringAxleModel'][i+num].name}_{randint(1, 100)}",
                    supply_contract=f"Контракт №{randint(1, 100)}/2025",
                    shipment_date_factory=date(2025, 5, i+1),
                    consignee=f"ООО Покупатель {i+1}",
                    delivery_address=f"г. Город {i+1}, ул. Ленина, д. {i+10}",
                    equipment_options="Фильтр, кондиционер",
                    client=client,
                    service_company=service
                )

                Maintenance.objects.create(
                    maintenance_type=handbook['MaintenanceType'][i+num],
                    maintenance_date=date(2025, 5, i+5),
                    operating_time=1000 + i * 100,
                    order_number=f"ТО-{i+1}",
                    order_date=date(2025, 5, i+4),
                    service_company=service,
                    machine=machine
                )

                Claim.objects.create(
                    failure_date='2025-05-10',
                    operating_time=1200,
                    failure_node=handbook['FailureNode'][i+num],
                    failure_description="Протечка масла",
                    recovery_method=handbook['RecoveryMethod'][i+num],
                    spare_parts_used="Насос, прокладка",
                    recovery_date='2025-05-13',
                    downtime='3',
                    service_company=service,
                    machine=machine
                )

        self.stdout.write(self.style.SUCCESS('Данные успешно добавлены'))
