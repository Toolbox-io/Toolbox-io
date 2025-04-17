# Политика конфиденциальности
## Какие данные мы собираем
Никакие данные не собираются и не передаются без согласия пользователя. Если какие-то данные
потребуются, приложение предупредит об этом.

## Функции, которые могут собирать данные
### Отчёты о сбоях
При сбое можно отправить отчёт по желанию. Вместе с отчётом будет отправлена информация о бренде
устройства, модели, версии Android и версии приложения.
### Блокировка приложений
Для блокировки приложений требуется разрешение специальных возможностей. Это разрешение используется
для обнаружения открытия защищённого приложения и показа фейкового диалога о сбое.
### Защита блокировки
Для защиты блокировки требуется разрешение администратора устройства. Это необходимо для обнаружения
неудачных попыток разблокировать устройство и выполнения нужных действий.
В этой функции следующие действия могут собирать данные:

- **Фото мошенника.** Для этой функции требуется разрешение камеры. Это разрешение используется
  только тогда, когда человек неверно разблокирует экран или каким-нибудь другим образом
  активирует действия защиты.

### Менеджер приложений
Этой функции требуется получить доступ к вашим приложениям. Данные о
приложениях остаются приватными и никому не передаются.
### История уведомлений
Для работы этой функции требуется доступ к уведомлениям. Это разрешение используется
только для того, чтобы прочитать и сохранить уведомление на устройстве. Уведомления остаются
приватными и никому не передаются.

### Файлы cookie
Файлы cookie — это небольшой фрагмент данных, который принимается и обрабатывается устройством,
которое Вы используете для доступа к Сайтам.

На нашем сайте используются файлы cookie, которые необходимы для его работы. В настоящее время их
нельзя отключить. Файлы cookie помогают улучшить ваш опыт использования сайта, обеспечивая более
быструю загрузку страниц и персонализированные рекомендации. Мы стремимся соблюдать баланс между
удобством использования и защитой вашей конфиденциальности.

### Разрешения, использованные приложением
<table>
    <thead>
    <tr>
        <th scope="col">Название</th>
        <th scope="col">Техническое название</th>
        <th scope="col">Описание</th>
        <th scope="col">Для чего нужно</th>
    </tr>
    </thead>
    <tbody>
    <tr>
        <td>
            <a href="https://developer.android.com/guide/topics/ui/accessibility/service">
                Служба спец. возможностей
            </a>
        </td>
        <td>
            <code>android.permission.ACCESSIBILITY_SERVICE</code>
        </td>
        <td>
            Позволяет службам спец. возможностей работать
        </td>
        <td>
            Необходимо для корректной работы службы спец. возможностей
        </td>
    </tr>
    <tr>
        <td>
            <a href="https://developer.android.com/reference/android/Manifest.permission#QUERY_ALL_PACKAGES">
                Запрос всех пакетов
            </a>
        </td>
        <td>
            <code>android.permission.QUERY_ALL_PACKAGES</code>
        </td>
        <td>
            Позволяет приложению получать информацию о всех пакетах (приложениях),
            установленных на устройстве.
        </td>
        <td>
            Необходимо для корректной работы:
            <ul>
                <li>Экрана выбора приложений в функции "Блокировка приложений;</li>
                <li>извлечения APK.</li>
            </ul>
        </td>
    </tr>
    <tr>
        <td>
            <a href="https://developer.android.com/reference/android/Manifest.permission#INTERNET">
                Интернет
            </a>
        </td>
        <td>
            <code>android.permission.INTERNET</code>
        </td>
        <td>
            Позволяет приложению получать доступ в Интернет.
        </td>
        <td>
            Необходимо для корректной работы проверки обновлений.
        </td>
    </tr>
    <tr>
        <td>
            <a href="https://developer.android.com/reference/android/Manifest.permission#REQUEST_INSTALL_PACKAGES">
                Запрос на установку приложений
            </a>
        </td>
        <td>
            <code>android.permission.REQUEST_INSTALL_PACKAGES</code>
        </td>
        <td>
            Позволяет приложению запрашивать установку других приложений.
        </td>
        <td>
            Необходимо для корректной работы установки обновлений.
        </td>
    </tr>
    <tr>
        <td>
            <a href="https://developer.android.com/reference/android/Manifest.permission#POST_NOTIFICATIONS">
                Уведомления
            </a>
        </td>
        <td>
            <code>android.permission.POST_NOTIFICATIONS</code>
        </td>
        <td>
            Позволяет приложению показывать уведомления.
        </td>
        <td>
            Необходимо для корректной работы обновлений и
            <a href="https://developer.android.com/develop/background-work/services/fgs?skip_cache=true">
                службы переднего плана
            </a> для поддержки работы
            функций защиты.
        </td>
    </tr>
    <tr>
        <td>
            <a href="https://developer.android.com/reference/android/Manifest.permission#FOREGROUND_SERVICE">
                Службы переднего плана
            </a>
        </td>
        <td>
            <code>android.permission.FOREGROUND_SERVICE</code>
        </td>
        <td>
            Позволяет приложению запускать
            <a href="https://developer.android.com/develop/background-work/services/fgs?skip_cache=true">
                службы переднего плана
            </a>.
        </td>
        <td>
            Необходимо для корректной работы функций защиты.
        </td>
    </tr>
    <tr>
        <td>
            <a href="https://developer.android.com/reference/android/Manifest.permission#REQUEST_DELETE_PACKAGES">
                Запросы на удаление приложений
            </a>
        </td>
        <td>
            <code>android.permission.REQUEST_DELETE_PACKAGES</code>
        </td>
        <td>
            Позволяет приложению запрашивать удаление приложений.
        </td>
        <td>
            Необходимо для корректной работы функции быстрого удаления приложения.
        </td>
    </tr>
    <tr>
        <td>
            <a href="https://developer.android.com/reference/android/Manifest.permission#CAMERA">
                Камера
            </a>
        </td>
        <td>
            <code>android.permission.CAMERA</code>
        </td>
        <td>
            Позволяет приложению использовать камеру.
        </td>
        <td>
            Необходимо для корректной работы функции "Фото мошенника".
        </td>
    </tr>
    <tr>
        <td>
            <a href="https://developer.android.com/reference/android/Manifest.permission#RECEIVE_BOOT_COMPLETED">
                Запускатся после запуска
            </a>
        </td>
        <td>
            <code>android.permission.RECEIVE_BOOT_COMPLETED</code>
        </td>
        <td>
            Позволяет приложению запустится после запуска системы. Если есть пароль, то приложение будет
            запущено только тогда, когда пользователь разблокирует экран.
        </td>
        <td>
            Необходимо для корректной работы проверки обновлений.
        </td>
    </tr>
    <tr>
        <td>
            <a href="https://developer.android.com/reference/android/Manifest.permission#FOREGROUND_SERVICE_CAMERA">
                Служба переднего плана с камерой
            </a>
        </td>
        <td>
            <code>android.permission.FOREGROUND_SERVICE_CAMERA</code>
        </td>
        <td>
            Позволяет приложению использовать камеру в фоновом режиме с помощью
            <a href="https://developer.android.com/develop/background-work/services/fgs?skip_cache=true">
                службы переднего плана
            </a>.
        </td>
        <td>
            Необходимо для корректной работы функции "Фото мошенника".
        </td>
    </tr>
    <tr>
        <td>
            <a href="https://developer.android.com/reference/android/Manifest.permission#VIBRATE">
                Вибрация
            </a>
        </td>
        <td>
            <code>android.permission.VIBRATE</code>
        </td>
        <td>
            Позволяет приложению включать вибрацию телефона.
        </td>
        <td>
            Это разрешение нужно только для эффектов в приложении.
        </td>
    </tr>
    <tr>
        <td>
            <a href="https://developer.android.com/reference/android/Manifest.permission#ACCESS_NETWORK_STATE">
                Получение информации о сети
            </a>
        </td>
        <td>
            <code>android.permission.ACCESS_NETWORK_STATE</code>
        </td>
        <td>
            Позволяет приложению получать информацию о сети.
        </td>
        <td>
            Необходимо для правильной работы проверки обновлений.
        </td>
    </tr>
    <tr>
        <td>
            <a href="https://developer.android.com/reference/android/Manifest.permission#WAKE_LOCK">
                Блокировка спящего режима
            </a>
        </td>
        <td>
            <code>android.permission.WAKE_LOCK</code>
        </td>
        <td>
            Позволяет приложению блокировать перход устройства в спящий режим.
        </td>
        <td>
            Необходимо для работы плитки "Спящий режим".
        </td>
    </tr>
    </tbody>
</table>

#### Вставка из [манифеста](https://developer.android.com/guide/topics/manifest/manifest-intro) приложения
```xml
<uses-permission android:name="android.permission.ACCESSIBILITY_SERVICE" />
<uses-permission
    android:name="android.permission.QUERY_ALL_PACKAGES"
    tools:ignore="QueryAllPackagesPermission" />
<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.REQUEST_INSTALL_PACKAGES" />
<uses-permission android:name="android.permission.POST_NOTIFICATIONS" />
<uses-permission android:name="android.permission.FOREGROUND_SERVICE" />
<uses-permission android:name="android.permission.REQUEST_DELETE_PACKAGES" />
<uses-permission android:name="android.permission.CAMERA" />
<uses-permission android:name="android.permission.RECEIVE_BOOT_COMPLETED" />
<uses-permission android:name="android.permission.FOREGROUND_SERVICE_CAMERA" />
<uses-permission android:name="android.permission.VIBRATE" />
<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
<uses-permission android:name="android.permission.WAKE_LOCK" />
```

#### Дополнительные разрешения, использованные библиотекой [androidx-biometric](https://developer.android.com/jetpack/androidx/releases/biometric):
```xml
<uses-permission android:name="android.permission.USE_BIOMETRIC" />
<uses-permission android:name="android.permission.USE_FINGERPRINT" />
```

Эти разрешения использованы для биометрической аутентфикации в приложении.