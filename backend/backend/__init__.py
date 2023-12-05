from supertokens_python import init, InputAppInfo, SupertokensConfig
from supertokens_python.recipe import emailpassword, session
from supertokens_python.recipe import dashboard
init(
    app_info=InputAppInfo(
        app_name="api",
        api_domain="0.0.0.0:8000",
        website_domain="0.0.0.0:3000",
        api_base_path="/auth",
        website_base_path="/auth"
    ),
    supertokens_config=SupertokensConfig(
        # https://try.supertokens.com is for demo purposes. Replace this with the address of your core instance (sign up on supertokens.com), or self host a core.
        connection_uri="0.0.0.0:3567",
        # api_key=<API_KEY(if configured)>
    ),
    framework='django',
    recipe_list=[
        session.init(), # initializes session features
        emailpassword.init(),
        dashboard.init()
    ],
    mode='asgi' # use wsgi if you are running django server in sync mode
)