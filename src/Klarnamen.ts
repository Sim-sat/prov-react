// Types/Labels.ts
export const KLARNAME: Record<string, string> = {
    // Maschine und Underlayfunktionen
    'mul_netzwerkverkabelung': 'Netzwerkverkabelung wie im Design vorgesehen',
    'mul_stromversorgung': 'Prüfung redundante Stromversorgungen (falls vorhanden)',
    'mul_cluster_ha': 'Cluster HA-Links geprüft und Monitoring Interfaces geprüft',
    'mul_wan': 'WAN Prüfungen (ICMP Check und DNS-Prüfung)',
    'mul_systemzeit': 'Systemzeit auf dem Gerät stimmt mit der lokalen Zeit überein',
    'mul_fortiextender': 'FortiExtender Funktionen geprüft (Konnektivität, Autorisierung, Funktion)',
    'mul_leitungsqualitaeten_underlays': 'Leitungsqualitäten geprüft für alle Underlays',
    'mul_leitungsqualitaet': 'Leitungsqualität prüfen',
    'mul_redundanztests': 'Redundanztests durchgeführt',
    'mul_redundanztests_ha_sdwan': 'Redundanztests Hochverfügbarkeit und SD-WAN',

    // Wartungszugriff
    'wz_tunnel': 'Zugriff auf GUI/SSH über Extender Tunnel erreichbar',
    'wz_management_tunnel': 'VPN Management-Tunnel aufgebaut',
    'wz_management_interface': 'Zugriff auf GUI/SSH über das Loopback Management Interface funktioniert',
    'wz_bgp_management': 'BGP Management Routing etabliert und in beide Richtungen übermittelte Präfixe überprüft',

    // Extenderkonfigurationen
    'ex_lanextension': 'LAN-Extension ist konfiguriert und getestet',
    'ex_wan_ha': 'WAN Hochverfügbarkeit konfiguriert und getestet',

    // Overlay
    'ov_tunnel': 'SD-WAN Overlay Tunnel zum Hub ist etabliert',
    'ov_bgp_ospf': 'BGP/OSPF Routing im / in den Overlay(s) funktioniert',
    'ov_qos': 'Kontrolle Quality of Service',
    'ov_regelwerk': 'Kontrolle SD-WAN Regelwerk',

    // Standortkonfigurationen
    'sk_securityprofile': 'Securityprofile konfiguriert',
    'sk_vpn_tunnel': 'VPN-Tunnel etabliert und funktional',
    'sk_vpn_einwahl': 'VPN-Einwahl konfiguriert und getestet',
    'sk_lan': 'LAN Schnittstellen konfiguriert und getestet',
    'sk_dmz_dnat': 'DMZ & DNAT konfiguriert und getestet',
    'sk_authentifizierungsdienste': 'Authentifizierungsdienste konfiguriert und getestet',

    // Aufnahme Maschinen im zentralen Management
    'zm_fortimanager_adom': 'Gerät im FortiManager angelegt/autorisiert in richtiger Kunden-ADOM',
    'zm_fortimanager_policy_package': 'Gerät im FortiManager mit dem richtigen Policy-Package verknüpft',
    'zm_fortimanager_interface_mapping': 'Interface-Mapping für das Gerät im FortiManager kontrolliert/korrigiert',
    'zm_fortimanager_policy_push': 'Policy Push vom FortiManager funktioniert und Gerät in Sync',
    'zm_fortianalyzer': 'Gerät im FortiAnalyzer angelegt/autorisiert und Log-Prüfung',
    'zm_prtg': 'Gerät im PRTG angelegt und alle relevanten Sensoren angelegt und aktiviert',
    'zm_sla_reporting': 'Gerät im SLA Reporting mit aufgenommen (PRTG)',
    'zm_ansible_password': 'Ansible Provisionierungs-Kennwort ändern und getestet mittels Erstellung',
    'zm_backup': 'Backup eingerichtet',

    // Dokumentation und Wartungsinformationen
    'duw_dokumentation': 'Prüfung Standort-Dokumentation auf Abweichungen / ggf. Korrektur der Dokumentation',
    'duw_password_safe': 'Logindaten (Admin-User) im Password-Safe hinterlegt',
    'duw_admin_login': 'Admin-Login Web-GUI funktioniert',
    'duw_personalisierte_accounts': 'Personalisierte Account-Login Web-GUI funktioniert',
    'duw_forticare': 'Prüfung Gerät ist FortiCare registriert',
    'duw_fortiguard': 'FortiGuard funktioniert für Antivirus/IPS Pattern-Updates',
    'duw_trusted_hosts': 'Trusted Hosts für alle Admin-Accounts eingetragen',
    'duw_servicenow': 'Asset in ServiceNow zugewiesen',
};