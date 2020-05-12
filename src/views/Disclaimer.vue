<template>
  <v-content>
    <v-container fluid class="scroll">
      <v-row align="center" justify="center">
        <v-col cols="5.5"> </v-col>
        <v-col cols="1">
          <v-img src="../assets/logo_transparent_background.png" />
        </v-col>
        <v-col cols="5.5"> </v-col>
      </v-row>
      <v-row align="center" justify="center">
        <v-col cols="12">
          <v-card class="elevation-12">
            <v-toolbar dark flat>
              <v-toolbar-title class="primary--text"
                >Disclaimer</v-toolbar-title
              >
              <v-spacer></v-spacer>
            </v-toolbar>
            <v-card-text>
              <h1>Disclaimer</h1>
              <p>
                This disclaimer (&quot;Disclaimer&quot;, &quot;Agreement&quot;)
                is an agreement between Website Operator (&quot;Website
                Operator&quot;, &quot;us&quot;, &quot;we&quot; or
                &quot;our&quot;) and you (&quot;User&quot;, &quot;you&quot; or
                &quot;your&quot;). This Disclaimer sets forth the general
                guidelines, terms and conditions of your use of the
                <a
                  target="_blank"
                  rel="nofollow"
                  href="https://jam-along.azurewebsites.net"
                  >jam-along.azurewebsites.net</a
                >
                website and any of its products or services (collectively,
                &quot;Website&quot; or &quot;Services&quot;).
              </p>
              <h2>Representation</h2>
              <p>
                Any views or opinions represented on the Website are personal
                and belong solely to Website Operator and do not represent those
                of people, institutions or organizations that the owner may or
                may not be associated with in professional or personal capacity
                unless explicitly stated. Any views or opinions are not intended
                to malign any religion, ethnic group, club, organization,
                company, or individual.
              </p>
              <h2>Content and postings</h2>
              <p>
                You may not modify, print or copy any part of the Website.
                Inclusion of any part of this Website in another work, whether
                in printed or electronic or another form or inclusion of any
                part of the Website in another website by embedding, framing or
                otherwise without the express permission of Website Operator is
                prohibited.
              </p>
              <p>
                You may submit comments for the available Content on the
                Website. By uploading or otherwise making available any
                information to Website Operator, you grant Website Operator the
                unlimited, perpetual right to distribute, display, publish,
                reproduce, reuse and copy the information contained therein. You
                may not impersonate any other person through the Website. You
                may not post content that is defamatory, fraudulent, obscene,
                threatening, invasive of another person's privacy rights or that
                is otherwise unlawful. You may not post content that infringes
                on the intellectual property rights of any other person or
                entity. You may not post any content that includes any computer
                virus or other code designed to disrupt, damage, or limit the
                functioning of any computer software or hardware.
              </p>
              <h2>Indemnification and warranties</h2>
              <p>
                While we have made every attempt to ensure that the information
                contained on the Website is correct. Website Operator is not
                responsible for any errors or omissions, or for the results
                obtained from the use of this information. All information on
                the Website is provided &quot;as is&quot;, with no guarantee of
                completeness, accuracy, timeliness or of the results obtained
                from the use of this information, and without warranty of any
                kind, express or implied. In no event will Website Operator be
                liable to you or anyone else for any decision made or action
                taken in reliance on the information on the Website or for any
                consequential, special or similar damages, even if advised of
                the possibility of such damages.
              </p>
              <p>
                We reserve the right to modify this Disclaimer relating to the
                Website, products or services at any time, effective upon
                posting of an updated version of this Disclaimer on the Website.
                When we do we will revise the updated date at the bottom of this
                page. Continued use of the Website after any such changes shall
                constitute your consent to such changes. Policy was created with
                <a
                  style="color:inherit"
                  target="_blank"
                  title="Sample disclaimer template"
                  href="https://www.websitepolicies.com/disclaimer-generator"
                  >WebsitePolicies</a
                >.
              </p>
              <h2>Acceptance of this disclaimer</h2>
              <p>
                You acknowledge that you have read this Disclaimer and agree to
                all its terms and conditions. By accessing the Website you agree
                to be bound by this Disclaimer. If you do not agree to abide by
                the terms of this Disclaimer, you are not authorized to use or
                access the Website.
              </p>
              <h2>Contacting us</h2>
              <p>
                If you have any questions about this Disclaimer, please contact
                us.
              </p>
              <p>This document was last updated on May 12, 2020</p>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <v-footer app>
        <span>&copy; 2020</span>
        <span>
          <router-link to="/home"><v-icon>mdi-home</v-icon></router-link>
        </span>
      </v-footer>
    </v-container>
  </v-content>
</template>

<script>
export default {
  name: "Disclaimer",
  methods: {
    logout: function() {
      console.log("");
    },
  },
};
</script>
<style scoped>
.scroll {
  overflow-y: auto;
}
</style>
