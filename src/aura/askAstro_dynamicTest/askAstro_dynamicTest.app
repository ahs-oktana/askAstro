<aura:application extends="force:slds">
   <aura:attribute name='cmpName' type='string'/>
   <aura:handler name="init" value="{!this}" action="{!c.doInit}"/>
   <aura:handler event="aura:doneRendering" action="{!c.doneRendering}"/>


   <div id="testing">
    {!v.body}
   </div>
</aura:application>